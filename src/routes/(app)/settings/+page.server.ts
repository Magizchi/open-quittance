import db from "$lib/db/drizzle.js";
import { landlordsTable, usersTable } from "$lib/db/schema.js";
import FormDataToJson from "$lib/utils/FormDataToJson.js";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import checkCookie, { createCookie } from "$lib/utils/remember_me.js";
import { WEB_DEMO } from "$env/static/private";

export const load = async ({ parent }) => {
  await parent();

  const [landlord] = await db.select().from(landlordsTable);
  return { landlord, webDemo: WEB_DEMO === "true" };
};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const userCookie = checkCookie(cookies);
    const { email, currentPassword, newPassword, confirmPassword } =
      FormDataToJson(data);

    if (!userCookie) {
      return fail(401, {
        success: false,
        message: "Vous devez être connecté",
      });
    }

    if (email === "" || currentPassword === "") {
      return fail(404, {
        success: false,
        message: "Email ou Mot de passe doit être remplis",
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
      .where(eq(usersTable.loginToken, userCookie.loginToken));

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

    if (newPassword !== confirmPassword) {
      return fail(404, {
        message: "Le nouveau mot de passe ne correspond pas",
        incorrect: true,
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync());

    try {
      await db.update(usersTable).set({
        ...user,
        email,
        password: newPassword ? hashedPassword : user.hash,
      });

      await createCookie({ ...user, email }, cookies);
    } catch {
      return fail(404, {
        message: "Une erreur c'est produite",
        incorrect: true,
      });
    }
  },
};
