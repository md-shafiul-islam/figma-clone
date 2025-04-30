import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import { singInSchem } from "@/schemas";
import bcrypt from "bcrypt";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          console.log("DB User Login, .... ", credentials);
          const { email, password } = await singInSchem.parseAsync(credentials);

          const dbUser = await db.user.findUnique({ where: { email } });
          console.log("DB User Login, ", dbUser, " input password ", password);
          const isMatch = await bcrypt.compare(
            password,
            dbUser?.password ?? "",
          );

          console.log("Password Match ", isMatch);

          if (!isMatch) {
            return null;
          }
          return dbUser;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
} satisfies NextAuthConfig;
