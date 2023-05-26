import type { Exercise } from '@prisma/client'

import type { Context } from '@/graphql/context'
import type {
  Maybe,
  MutationAddExerciseByPartArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
} from '@/graphql/generated/resolvers-types'

export const addExerciseByPart:
  | Resolver<
      Maybe<ResolverTypeWrapper<Exercise>>,
      {},
      Context,
      RequireFields<MutationAddExerciseByPartArgs, 'name' | 'partId'>
    >
  | undefined = async (_, { name, partId }, { prisma, currentUser }) => {
  if (!currentUser) {
    throw new Error('ユーザがログインしていません。')
  }

  // 同じ名前のExerciseが存在するかチェック
  const existingExercise = await prisma.exercise.findFirst({
    where: { name },
  })

  if (existingExercise) {
    throw new Error('既に同じ名前の種目が登録されています。')
  }

  // 指定された部位が存在するかチェック
  const existingPart = await prisma.part.findFirst({
    where: { id: partId },
  })

  if (!existingPart) {
    throw new Error('そのような部位は存在しません。')
  }

  const exercise = await prisma.exercise.create({
    data: {
      name,
      user: { connect: { id: currentUser.id } },
      parts: { connect: { id: existingPart.id } },
    },
  })

  return exercise
}
