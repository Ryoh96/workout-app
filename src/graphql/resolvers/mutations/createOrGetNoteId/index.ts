import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const createOrGetNoteId:
  | Resolver<ResolverTypeWrapper<Note>, {}, Context, {}>
  | undefined = async (_, __, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  const today = new Date()
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  )

  // 今日のNoteを検索
  const existingNote = await prisma.note.findFirst({
    where: {
      userId: currentUser.id,
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  })

  if (existingNote) {
    // 既存のNoteがある場合はそのIDを返す
    return existingNote
  } else {
    // 既存のNoteがない場合は新しいNoteを作成してそのIDを返す
    const newNote = await prisma.note.create({
      data: {
        user: { connect: { id: currentUser.id } },
      },
    })
    return newNote
  }
}
