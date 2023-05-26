import type { Part } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type { QueryPartsArgs } from '@/graphql/generated/operations-ssg'
import type {
  Maybe,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const parts:
  | Resolver<
      Maybe<ResolverTypeWrapper<Part>[]>,
      {},
      Context,
      Partial<QueryPartsArgs>
    >
  | undefined = async (_, __, { prisma }) => {
  const parts = await prisma.part.findMany()
  return parts
}
