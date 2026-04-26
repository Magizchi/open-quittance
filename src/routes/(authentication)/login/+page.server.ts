import { sessionCookieName } from "$lib/constants/auth-session";
import { ROUTES } from "$lib/constants/routes.js";
import db from "$lib/db/drizzle";
import { usersTable } from "$lib/db/schema";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "$lib/utils/auth";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import "dotenv/config";
import { eq } from "drizzle-orm";

/**
 * TODO:
 * [] Get device (name/id; computer/smartphone)
 * [] Get the number of login attempt
 * [] One Session by device
 */

export const load = ({ cookies }) => {
  const cookiesJwt = cookies.get(sessionCookieName);
  if (cookiesJwt) {
    throw redirect(303, ROUTES.landing);
  }
  const webDemo = process.env.WEB_DEMO === "true";
  return { webDemo };
};

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const login = data.get("username") || "";
    const formPassword = data.get("password") || "";

    if (!login || !formPassword) {
      return fail(403, {
        message: "Donnée incorrect",
        incorrect: true,
      });
    }

    // Check user email
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        password: usersTable.password,
        token: usersTable.loginToken,
      })
      .from(usersTable)
      .where(eq(usersTable.email, login.toString()));

    if (!user) {
      return fail(403, {
        message: "Identifiant ou Mot de passe incorrect",
        incorrect: true,
      });
    }
    // Check password
    const { password } = user;
    const authenticated = await bcrypt.compare(
      formPassword.toString(),
      password
    );

    if (!authenticated) {
      return fail(401, {
        message: "Identifiant ou Mot de passe incorrect",
        incorrect: true,
      });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    throw redirect(303, ROUTES.landing);
  },
};
