import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "utils/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "", // Provide fallback or throw error if missing
      clientSecret: process.env.GITHUB_SECRET || "", // Same as above
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // Check for profile and email_verified fields safely
        if (profile && 'email_verified' in profile && profile.email_verified && profile.email?.endsWith("@gmail.com")) {
          return true
        }
        return false
      }
      return true // Default sign-in behavior for other providers
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.isAdmin = session.user.email === "prabhakarmanoj743@gmail.com"
      }
      return session
    }
  }
}

export default NextAuth(authOptions)
