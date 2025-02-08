import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

import authConfig from "./auth.config";
import { SessionUserProfile } from "./types";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  ...authConfig,
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...token, ...user };
      }
      if (trigger === "update") {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      let user = token as typeof token & SessionUserProfile;

      if (token.user) {
        user = token.user as JWT & SessionUserProfile;
      }

      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          email: user.email,
          name: user.name,
          isVerified: user.isVerified,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
