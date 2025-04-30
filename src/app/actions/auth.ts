"use server";

import { singInSchem, singUpSchem } from "@/schemas";
import { db } from "@/server/db";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";

export async function register(
  prevState: { errorMessage: string },
  formData: FormData,
) {
  try {
    console.log("formData, ", formData);
    const { email, password } = await singUpSchem.parseAsync({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    // TODO: handle registration logic here

    const dbUser = await db.user.findUnique({ where: { email } });

    if (dbUser) {
      return { errorMessage: "User already exists" };
    }

    const hash = await bcrypt.hash(password, 10);

    await db.user.create({ data: { email, password: hash } });
  } catch (error) {
    console.log("Sign Up Error", error);
    if (error instanceof ZodError) {
      return {
        errorMessage: error.errors.map((e) => e.message).join(", "),
      };
    }

    return { errorMessage: "Something went wrong" };
  }
  return redirect("/signin"); // success
}
