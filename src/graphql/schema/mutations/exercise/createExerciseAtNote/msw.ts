import { graphql } from 'msw'

import { CreateExerciseAtNoteDocument } from '@/graphql/generated/operations-csr'

import { createExerciseAtNote } from './fixture'

export const handleCreateExerciseAtNote = (args?: {
  status?: number
  loadingInfinite?: boolean
}) => {
  return graphql.mutation(CreateExerciseAtNoteDocument, (_req, res, ctx) => {
    if (args?.status === 200)
      return res(
        ctx.status(200),
        ctx.delay(args.loadingInfinite ? 'infinite' : 100)
      )
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(createExerciseAtNote))
  })
}
