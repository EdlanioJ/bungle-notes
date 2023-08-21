import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession } from 'next-auth'
import type { NextAuthOptions, DefaultSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { env } from '@/env.mjs'
import { prisma } from '@/server/db'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      username: string
      name: string
      image: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  interface User {
    username: string
    // ...other properties
    //   // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
      },
    }),

    async jwt({ token, trigger, user }) {
      if (trigger === 'signUp') {
        await prisma.project.create({
          data: {
            name: 'Default',
            slug: 'default',
            description: 'This is the default project',
            userId: user.id,
            tasks: {
              create: {
                name: 'Account created successfully',
                content:
                  'Welcome to Kanban4Dev platform, here you can create and manager the tasks for your projects',
                date: new Date(),
                status: 'done',
                tags: [{ value: 'welcome', color: 'bg-blue-500' }],
                userId: user.id,
              },
            },
          },
        })
      }
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          username: profile.login,
          image: profile.avatar_url,
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  return getServerSession(authOptions)
}
