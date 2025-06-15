import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { google } from 'googleapis'
import { compare } from 'bcryptjs'
import { readSheet } from '@/utils/googleSheets'
import { JWT } from 'google-auth-library'

// Initialize the Google Sheets API
const auth = new JWT({
  email: 'media-computers-sheets@civil-partition-462216-n4.iam.gserviceaccount.com',
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password')
        }

        try {
          // Read users from Google Sheet
          const users = await readSheet('SIGNUPS')
          console.log('Retrieved users:', users)
          
          // Find user by email (case-insensitive)
          const user = users.find((row: any) => 
            row.email?.toLowerCase() === credentials.email.toLowerCase()
          )
          
          if (!user) {
            console.log('No user found with email:', credentials.email)
            throw new Error('No user found with this email')
          }

          // Verify password
          const isValid = await compare(credentials.password, user.password)
          
          if (!isValid) {
            console.log('Invalid password for user:', credentials.email)
            throw new Error('Invalid password')
          }

          return {
            id: user.email,
            email: user.email,
            name: user.name
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw error
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
      }
      return session
    }
  }
})

export { handler as GET, handler as POST } 