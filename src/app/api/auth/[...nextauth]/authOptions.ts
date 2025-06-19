import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { readSheet } from '@/utils/googleSheets';
import type { AuthOptions, Session, User } from 'next-auth';
import type { JWT as JWTType } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }
        try {
          const users = await readSheet('SIGNUPS');
          const user = users.find((row: any) =>
            row.email?.toLowerCase() === credentials.email.toLowerCase()
          );
          if (!user) throw new Error('No user found with this email');
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) throw new Error('Invalid password');
          return { id: user.email, email: user.email, name: user.name };
        } catch (error) {
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWTType, user?: User }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: { session: Session, token: JWTType }) {
      if (session.user) (session.user as any).id = token.id;
      return session;
    }
  }
}; 