import { API_URL } from '@/utils/config';

import NextAuth, { Session } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Define the types for the user object
interface User {
  email: string;
  _id: string;
  token: string;
  // Add other properties as needed
}

// Define the types for the JWT token
interface JWT {
  user?: User;
  // Add other properties as needed
  accessToken?: string;
}

// Extend the NextAuth types to include your custom session and token properties
declare module 'next-auth' {
  interface Session {
    user: User; // Custom user type
    accessToken: string; // The access token
  }

  interface JWT {
    user?: User;
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
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

          const user: User = await res.json();
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
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.user = user;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (token?.user) {
        session.user = token.user;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },
} as NextAuthOptions);
