import { graphql } from 'msw'

import { RenameExerciseDocument } from '@/graphql/generated/operations-csr'

import { renameExercise } from './fixture'

export const handleRenameExercise = (args?: { status?: number }) => {
  return graphql.mutation(RenameExerciseDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(renameExercise))
  })
}
