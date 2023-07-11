import type { Resolvers } from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const Part: Resolvers['Part'] = {
  exercises: async (parent, args, { prisma, currentUser }) => {
    if (!currentUser) {
      throw new ManipulationError('ユーザがログインしていません')
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
