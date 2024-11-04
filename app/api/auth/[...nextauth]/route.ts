import { AuthOptions, DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/utils/database/models/user.model";
import { connectToDatabase } from "@/utils/database";

export type ErrorWithMessageAndStatus = {
  message: string;
  status: number;
} & Error;

const options: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },

  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          return null;
        }
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials?.email });

          console.log("user", user);

          if (!user) {
            const error = new Error() as ErrorWithMessageAndStatus;
            error.message = "user not found";
            error.status = 404;
            throw error;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValid) {
            const error = new Error() as ErrorWithMessageAndStatus;
            error.message = "Invalid password";
            error.status = 403;
            throw error;
          }

          return { email: user.email, id: user._id };
        } catch (error) {
          const { message, status } = error as ErrorWithMessageAndStatus;
          console.log("error in authorize", message, status);
          const customError = new Error() as ErrorWithMessageAndStatus;
          customError.message = message;
          customError.status = status;
          throw customError;
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
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
