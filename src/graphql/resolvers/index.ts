import { DateTimeResolver } from 'graphql-scalars'

import type { Resolvers } from '../generated/resolvers-types'
import { Exercise, Note, Part, Round, Training } from './model'
import { Mutation } from './mutations'
import { Query } from './queries'

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Part,
  Note,
  Exercise,
  Training,
  Round,
  Query,
  Mutation: {
    changeExercisePart: async (
      _,
      { partId, exerciseId },
      { currentUser, prisma }
    ) => {
      if (!currentUser) {
        throw new Error('ユーザがログインしていません')
      }

      const user = await prisma.exercise
        .findUnique({
          where: {
            id: exerciseId,
          },
        })
        .user()

      if (user?.id !== currentUser.id) {
        throw new Error('アクセス権限がありません')
      }

      return prisma.exercise.update({
        where: {
          id: exerciseId,
        },
        data: {
          parts: {
            set: [{ id: partId }],
          },
        },
      })
    },
    pinOutMemo: async (_, { id }, { currentUser, prisma }) => {
      if (!currentUser) {
        throw new Error('ユーザがログインしていません')
      }

      const user = await prisma.memo
        .findUnique({
          where: {
            id,
          },
        })
        .exercise()
        .user()

      if (user.id !== currentUser.id) {
        throw new Error('アクセス権限がありません')
      }

      return prisma.memo.update({
        where: {
          id,
        },
        data: {
          pin: false,
        },
      })
    },
    ...Mutation,
  },
}
