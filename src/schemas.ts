import { object, string } from "zod";

export const singUpSchem = object({
  email: string({ required_error: "Email is Required" }).email({
    message: "Please enter Valid Email",
  }),
  password: string({ required_error: "Password is Required" })
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const singInSchem = object({
  email: string({ required_error: "Email is Required" }).email({
    message: "Please enter Valid Email",
  }),
  password: string({ required_error: "Password is Required" }),
});
