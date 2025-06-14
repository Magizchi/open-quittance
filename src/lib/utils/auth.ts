import { sessionCookieName } from "$lib/constants/auth-session";
import db from "$lib/db/drizzle";
import { type Session, sessionsTable, usersTable } from "$lib/db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase64url, encodeHexLowerCase } from "@oslojs/encoding";
import type { RequestEvent } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const generateSessionToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  const token = encodeBase64url(bytes);
  return token;
};

export const createSession = async (token: string, userId: number) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 30),
  };
  await db.insert(sessionsTable).values(session);
  return session;
};

export const validateSessionToken = async (token: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const [result] = await db
    .select({
      // Adjust user table here to tweak returned data
      user: { id: usersTable.id, username: usersTable.firstName },
      session: sessionsTable,
    })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }
  const { session, user } = result;

  const sessionExpired = Date.now() >= session.expiresAt.getTime();
  if (sessionExpired) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    return { session: null, user: null };
  }

  const renewSession =
    Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
  if (renewSession) {
    session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
    await db
      .update(sessionsTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionsTable.id, session.id));
  }

  return { session, user };
};

export type SessionValidationResult = Awaited<
  ReturnType<typeof validateSessionToken>
>;

export const invalidateSession = async (sessionId: string) => {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
};

export const setSessionTokenCookie = (
  event: RequestEvent,
  token: string,
  expiresAt: Date
) => {
  event.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
};

export const deleteSessionTokenCookie = (event: RequestEvent) => {
  event.cookies.delete(sessionCookieName, {
    path: "/",
  });
};
