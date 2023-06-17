import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Part: Resolvers['Part'] = {
  exercises: async (parent, args, { prisma, currentUser }) => {
    if (!currentUser) {
      throw new Error('ユーザがログインしていません')
    }
    return await prisma.part
      .findUnique({
        where: { id: parent.id },
      })
      .exercises({
        where: {
          userId: currentUser.id,
        },
      })
  },
}
