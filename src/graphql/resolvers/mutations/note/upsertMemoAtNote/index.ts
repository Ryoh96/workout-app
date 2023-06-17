import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationUpsertMemoAtNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const upsertMemoAtNote:
  | Resolver<
      ResolverTypeWrapper<Note>,
      {},
      Context,
      RequireFields<MutationUpsertMemoAtNoteArgs, 'id' | 'memo'>
    >
  | undefined = async (_, { id, memo, index }, { currentUser, prisma }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません')
  }

  if (memo.length === 0) {
    throw new Error('文字を入力してください')
  }

  const note = await prisma.note.findUnique({ where: { id } })
  if (!note) {
    throw new Error('ノートが存在しません')
  }

  if (currentUser.id !== note.userId) {
    throw new Error('アクセス権限がありません')
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
