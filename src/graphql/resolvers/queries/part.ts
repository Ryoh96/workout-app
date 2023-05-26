import type { Part } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryPartArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const part:
  | Resolver<
      Maybe<ResolverTypeWrapper<Part>>,
      {},
      Context,
      RequireFields<QueryPartArgs, 'id'>
    >
  | undefined = async (_, { id }, { prisma }) => {
  const part = await prisma.part.findUnique({
    where: {
      id,
    },
  })
  return part
}
