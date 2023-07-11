import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  QueryNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const note:
  | Resolver<
      Maybe<ResolverTypeWrapper<Note>>,
      {},
      Context,
      RequireFields<QueryNoteArgs, 'date'>
    >
  | undefined = async (_, { date }, { prisma, currentUser }) => {
  if (!currentUser?.id) {
    throw new ManipulationError('ユーザーがログインしていません')
  }

  const startOfDay = new Date(
    new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  )
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(
    new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  )
  endOfDay.setHours(23, 59, 59, 999)

  const existingNotes = await prisma.user
    .findUnique({
      where: {
        id: currentUser.id,
      },
    })
    .notes({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })
  return existingNotes?.[0] ?? null
}
