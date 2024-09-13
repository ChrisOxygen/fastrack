import { connectToDatabase } from "@/app/utils/database";
import { AuthOptions, DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// import { connectToDatabase } from "@app/utils/database";

import User from "@/models/user";
// import { AuthOptions } from "next-auth";

// const options: AuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

//   callbacks: {
//     async session({ session }) {
//       //   const user = session.user as { name: string, email: string, image: string, id: string };

//       if (session.user) {
//         const sessionUser = await User.findOne({ email: session.user.email });

//         session.user.id = sessionUser?._id.toString();
//       }

//       return session;
//     },
//     async signIn({ profile }) {
//       console.log(profile);
//       try {
//         await connectToDatabase();

//         if (profile) {
//           // check if the user already exists in the database

//           const userExists = await User.findOne({ email: profile.email });

//           // if the user does not exist, create a new user

//           if (!userExists) {
//             await User.create({
//               email: profile.email,
//               username: profile.name?.replace(" ", ""),
//               image: profile.picture,
//             });
//           }
//         }
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// };

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
