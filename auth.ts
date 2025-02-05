import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./utils/database/models/user.model";
import { JWT } from "next-auth/jwt";

import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/utils/database";
import { ErrorWithMessageAndStatus, SessionUserProfile } from "./types";

export class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

export class UnverifiedUserError extends CredentialsSignin {
  userName: string;

  constructor(userName: string) {
    super();
    this.userName = userName;
  }
}

export class CustomSigninError extends CredentialsSignin {
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    Credentials({
      // async because you will need to make a request to your API to validate the credentials
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        console.log("credentials", email, password);
        // Make a request to your API to validate the credentials

        await connectToDatabase();

        const user = await User.findOne({ email: email });
        if (!user) {
          throw new InvalidLoginError();
        }

        const isValid = bcrypt.compareSync(password, user.password!);

        if (!isValid) {
          console.log("Invalid password");
          const error = new Error() as ErrorWithMessageAndStatus;
          error.message = "Invalid email or password!";
          error.status = 400;

          throw new InvalidLoginError();
        }

        if (!user.isVerified) {
          console.log("User not verified----------");
          const err = new UnverifiedUserError(user.firstName);
          // err.userName = user.name;

          throw err;
        }

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          isVerified: user.isVerified,
        };
      },
    }),
  ],
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
