import path from 'node:path'

import { chromium } from '@playwright/test'
import { v4 } from 'uuid'

import { prisma } from '../../libs/prisma'

export const TEST_USER_ID = 'cllj9esh8gjiroaughal2jtxc2sxq'

export default async function globalConfig() {
  const storagePath = path.resolve(__dirname, 'storageState.json')
  const date = new Date()
  const sessionToken = '1238389e-ff19-4eb4-b73-b56516e9b7e8'

  await prisma.user.upsert({
    where: {
      email: 'hoge@hoge.com',
    },
    create: {
      name: 'hoge',
      id: TEST_USER_ID,
      email: 'hoge@hoge.com',
      sessions: {
        create: {
          expires: new Date(
            date.getFullYear(),
            date.getMonth() + 6,
            date.getDate()
          ),
          sessionToken,
        },
      },
      accounts: {
        create: {
          type: 'oauth',
          provider: 'github',
          providerAccountId: 'abc1234',
          access_token: 'Q3v0123oWcdzmxpGeiPG2I3wDgsJypSP',
          token_type: 'bearer',
          scope: 'read:user,user:email',
        },
      },
    },
    update: {},
  })
  const browser = await chromium.launch()
  const context = await browser.newContext()
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.round((Date.now() + 86400000 * 1) / 1000),
    },
  ])
  await context.storageState({ path: storagePath })
  await browser.close()
}
