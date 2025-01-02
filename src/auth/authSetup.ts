import { API_URL } from '@/utils/config';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${API_URL}/api/users/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email || ' ',
              password: credentials?.password || ' ',
            }),
            credentials: 'include',
          });

          const user = await res.json();
          if (res.ok && user.token) {
            return user;
          }
          return null;
        } catch (e) {
          console.log(e);
          throw new Error(e instanceof Error ? e.message : 'An error occurred');
        }
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page

      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as unknown;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    // signOut: '/login',
  },
});
