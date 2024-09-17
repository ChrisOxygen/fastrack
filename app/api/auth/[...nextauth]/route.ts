import { connectToDatabase } from "@/app/utils/database";
import { AuthOptions, DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import User from "@/models/user";

const options: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });

          if (user) {
            return { email: user.email, id: user._id };
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      session.user = token.user as {
        id: string;
      } & DefaultSession["user"];
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("signIn", user, account, profile);
      return true;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
