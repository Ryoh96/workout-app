import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationDeleteNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const deleteNote:
  | Resolver<
      ResolverTypeWrapper<Note>,
      {},
      Context,
      RequireFields<MutationDeleteNoteArgs, 'id'>
    >
  | undefined = async (_, { id }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザがログインしていません')
  }

  const user = await prisma.note.findUnique({ where: { id } }).user()

  if (!user || user.id !== currentUser.id) {
    throw new ManipulationError('アクセス権限がありません')
  }

  return prisma.note.delete({
    where: {
      id,
    },
  })
}
