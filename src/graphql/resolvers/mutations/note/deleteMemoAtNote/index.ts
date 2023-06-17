import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationDeleteMemoAtNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const deleteMemoAtNote:
  | Resolver<
      ResolverTypeWrapper<Note>,
      {},
      Context,
      RequireFields<MutationDeleteMemoAtNoteArgs, 'id' | 'index'>
    >
  | undefined = async (_, { index, id }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }
  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) {
    throw new Error('ノートが存在しません')
  }

  if (currentUser.id !== note.userId) {
    throw new Error('アクセス権限がありません')
  }

  if (index < 0 || index >= note.memos.length) {
    throw new Error('メモが存在しません')
  }

  note.memos.splice(index, 1)

  const updatedNote = await prisma.note.update({
    where: { id: note.id },
    data: { memos: { set: note.memos } },
  })

  return updatedNote
}
