import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'

import {
  EMAIL_FROM,
  EMAIL_SERVER,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} from '@/constants/env'
import { prisma } from '@/libs/prisma'
import { OAuthSettingError } from '@/utils/errors'

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new OAuthSettingError('Google Auth info not found.')
}

if (!process.env.EMAIL_SERVER || !process.env.EMAIL_FROM) {
  throw new OAuthSettingError('Email auth info not found.')
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new OAuthSettingError('NEXTAUTH_SECRET not found')
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.email = user.email
      }
      return session
    },
  },
})
