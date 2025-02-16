import connectDB from "@/config/db";
import User from "@/models/User.model";
import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    signIn: async ({ profile }) => {
      // connect to database
      await connectDB();

      // check if user exists
      const user = await User.findOne({
        email: profile?.email,
      });

      // if not create user
      if (!user) {
        // truncate the email to get the username
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username,
          image: profile?.picture,
        });
      }

      // return true to allow sign in
      return true;
    },
    session: async ({ session }) => {
      await connectDB();
      // get user from database
      const user = await User.findOne({
        email: session.user.email,
      });

      // assign   user id from the session
      session.user.id = user?._id.toString();

      return session;
    },
  },
};
