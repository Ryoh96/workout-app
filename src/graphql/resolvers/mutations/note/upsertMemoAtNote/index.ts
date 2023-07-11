import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationUpsertMemoAtNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'
import { ManipulationError } from '@/utils/errors'

export const upsertMemoAtNote:
  | Resolver<
      ResolverTypeWrapper<Note>,
      {},
      Context,
      RequireFields<MutationUpsertMemoAtNoteArgs, 'id' | 'memo'>
    >
  | undefined = async (_, { id, memo, index }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new ManipulationError('ユーザがログインしていません')
  }

  if (memo.length === 0) {
    throw new ManipulationError('文字を入力してください')
  }

  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) {
    throw new ManipulationError('ノートが存在しません')
  }

  if (currentUser.id !== note.userId) {
    throw new ManipulationError('アクセス権限がありません')
  }

  if (
    index !== undefined &&
    index !== null &&
    index >= 0 &&
    index < note.memos.length
  ) {
    note.memos[index] = memo
  } else {
    note.memos.push(memo)
  }

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { memos: { set: note.memos } },
  })

  return updatedNote
}
