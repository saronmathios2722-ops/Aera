import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Aera Account",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@aureve.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        // In a real app, we would verify the password hash.
        // For this demo/environment, we'll just find or create the user.
        let user = await db.users.getByEmail(credentials.email);

        if (!user) {
          const id = Math.random().toString(36).substring(2, 15);
          await db.users.create({
            id,
            email: credentials.email,
            name: credentials.email.split('@')[0],
          });
          await db.profiles.create(id);
          user = await db.users.getByEmail(credentials.email);
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || "at-least-32-characters-long-secret-for-development",
};
