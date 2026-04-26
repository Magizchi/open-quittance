import { sessionCookieName } from "$lib/constants/auth-session";
import * as auth from "$lib/utils/auth";
import { type Handle } from "@sveltejs/kit";

const handleAuth: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName);

  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await auth.validateSessionToken(sessionToken);

  if (session) {
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    auth.deleteSessionTokenCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};

export const handle: Handle = handleAuth;
