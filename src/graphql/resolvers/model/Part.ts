import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Part: Resolvers['Part'] = {
  exercises: async (parent, args, { prisma, currentUser }) => {
    return await prisma.part
      .findUnique({
        where: { id: parent.id },
      })
      .exercises()
  },
}
