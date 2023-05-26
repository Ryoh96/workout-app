import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Training: Resolvers['Training'] = {
  exercise: async (parent, args, { prisma, currentUser }) => {
    return await prisma.training
      .findUnique({ where: { id: parent.id } })
      .exercise()
  },
  rounds: async (parent, args, { prisma, currentUser }) => {
    return await prisma.training
      .findUnique({ where: { id: parent.id } })
      .rounds({
        orderBy: {
          createdAt: 'asc',
        },
      })
  },
}
