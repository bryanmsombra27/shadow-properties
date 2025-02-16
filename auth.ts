import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
