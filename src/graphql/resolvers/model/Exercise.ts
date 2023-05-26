import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Exercise: Resolvers['Exercise'] = {
  trainings: async (parent, args, { prisma, currentUser }) => {
    return await prisma.exercise
      .findUnique({
        where: { id: parent.id },
      })
      .trainings()
  },
  parts: async (parent, args, { prisma, currentUser }) => {
    return await prisma.exercise
      .findUnique({ where: { id: parent.id } })
      .parts()
  },
}
