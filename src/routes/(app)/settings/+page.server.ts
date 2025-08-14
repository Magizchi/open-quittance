import db from "$lib/db/drizzle.js";
import { landlordsTable, usersTable } from "$lib/db/schema.js";
import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { fail } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import "dotenv/config";
import { eq } from "drizzle-orm";

/**
 * TODO:
 *
 * Use Locals to get email
 * Send an email after change de email of user
 */
export const load = async ({ parent, locals }) => {
  await parent();
  const [landlord] = await db.select().from(landlordsTable);
  return {
    landlord,
    user: locals.user,
    webDemo: process.env.WEB_DEMO === "true",
  };
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const { email, currentPassword, newPassword, confirmPassword } =
      FormDataToJson(data);

    if (email === "" || currentPassword === "") {
      return fail(404, {
        success: false,
        message: "Email et Mot de passe doit être remplis",
      });
    }

    if (newPassword !== confirmPassword) {
      return fail(404, {
        message: "Le nouveau mot de passe ne correspond pas",
        incorrect: true,
      });
    }

    // Check user email
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        hash: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.loginToken, "userCookie.loginToken"));

    if (!user) {
      return fail(404, {
        message: "Identifiant ou Mot de passe incorrect",
        incorrect: true,
      });
    }

    const { hash } = user;
    const authenticated = bcrypt.compareSync(currentPassword.toString(), hash);

    if (!authenticated) {
      return fail(404, {
        message: "Identifiant ou Mot de passe incorrect",
        incorrect: true,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    try {
      await db.update(usersTable).set({
        ...user,
        email,
        password: newPassword ? hashedPassword : user.hash,
      });
    } catch {
      return fail(404, {
        message: "Une erreur c'est produite",
        incorrect: true,
      });
    }
  },
};
