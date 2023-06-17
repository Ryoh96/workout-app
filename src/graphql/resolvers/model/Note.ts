import type { Resolvers } from '@/graphql/generated/resolvers-types'

export const Note: Resolvers['Note'] = {
  trainings: async (parent, args, { prisma, currentUser }) => {
    return (
      (await prisma.note
        .findUnique({
          where: { id: parent.id },
        })
        .trainings()) || []
    )
  }
}
