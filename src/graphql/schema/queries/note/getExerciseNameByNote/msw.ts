import { graphql } from 'msw'

import { GetExerciseNameByNoteDocument } from '@/graphql/generated/operations-csr'

import { exerciseNamesByNote } from './fixture'

export const handleExerciseNameByNote = (args?: {
  status?: number
  loadingInfinite?: boolean
}) => {
  return graphql.query(GetExerciseNameByNoteDocument, (req, res, ctx) => {
    if (args?.status === 200)
      return res(
        ctx.status(200),
        ctx.delay(args.loadingInfinite ? 'infinite' : 100)
      )
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some errors' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(exerciseNamesByNote))
  })
}
