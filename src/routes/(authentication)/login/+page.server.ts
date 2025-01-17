import bcrypt from "bcrypt";
import { redirect, fail } from "@sveltejs/kit";
import db from "$lib/db/drizzle";
import { usersTable } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import "dotenv/config";
import { createCookie } from "$lib/utils/remember_me.js";
import { ROUTES } from "$lib/constants/routes.js";

export const load = ({ cookies }) => {
  const cookiesJwt = cookies.get("remember_me");
  if (cookiesJwt) {
    throw redirect(303, ROUTES.landing);
  }
  const webDemo = process.env.WEB_DEMO === "true";
  return { webDemo };
};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
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
    const { password, ...userInfo } = user;
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

    await createCookie(userInfo, cookies);

    throw redirect(303, ROUTES.landing);
  },
};
