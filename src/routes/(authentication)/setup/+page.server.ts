import { ROUTES } from "$lib/constants/routes.js";
import db from "$lib/db/drizzle";
import { usersTable } from "$lib/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt";
import "dotenv/config";

export const load = async () => {
  const [user] = await db.select().from(usersTable)
  if (user) {
      throw redirect(303, ROUTES.login);
  }
};

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const login = data.get("username") || "";
    const formPassword = data.get("password") || "";
    const formConfirmPassword = data.get("confirmPassword") || "";

    if (!login || !formPassword || !formConfirmPassword) {
      return fail(403, {
        message: "Donnée incorrect",
        incorrect: true,
      });
    }

     if (formPassword !== formConfirmPassword) {
      return fail(403, {
        message: "Donnée incorrect",
        incorrect: true,
      });
    }
    try {
      bcrypt.hash(formPassword.toString(), 5, async function(err, hash) {
        await db.insert(usersTable).values({
          email:login.toString(),
          firstName: '',
          lastName: '',
          password: hash
        })
        
      });
    }
    catch {
      return {
        message: "Une erreur c'est produite",
        success: false
      }
    }

    throw redirect(303, ROUTES.login);
  },
};
