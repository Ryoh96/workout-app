import type { Note } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  MutationCreateNoteArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const createNote:
  | Resolver<
      ResolverTypeWrapper<Note>,
      {},
      Context,
      RequireFields<MutationCreateNoteArgs, 'date'>
    >
  | undefined = async (_, { date }, { prisma, currentUser }) => {
    console.log(101010, currentUser)
  if (!currentUser) {
    throw new Error('ユーザーがログインしていません。')
  }

  let day = new Date(date)

  // const timeZoneOffset = 0* 60 // タイムゾーンオフセット（日本の場合はUTC+9）
  // day.setMinutes(day.getMinutes() + timeZoneOffset)

  const startOfDay = new Date(
    new Date(day).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  )
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(
    new Date(day).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  )
  endOfDay.setHours(23, 59, 59, 999)

  const note = await prisma.user
    .findUnique({
      where: {
        id: currentUser.id,
      },
    })
    .notes({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    })

  if (note?.length !== 0) {
    throw new Error('既にノートが存在しています')
  }

  //翌日以降のノートは作成禁止
  const now = new Date()

  const currentDateTime = new Date(
    now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  )
  currentDateTime.setHours(0, 0, 0, 0)

  const targetDateTime = new Date(
    new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  )
  targetDateTime.setHours(0, 0, 0, 0)

  if (targetDateTime > currentDateTime) {
    throw new Error('未来の日付でノートを作成することはできません')
  }

  const newNote = await prisma.note.create({
    data: {
      userId: currentUser.id,
      date: day,
    },
  })

  return newNote
}
