import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Round: Resolvers['Round'] = {
  memo: async (parent, args, { prisma, currentUser }) => {
    return await prisma.round.findUnique({ where: { id: parent.id } }).memo()
  },
}
