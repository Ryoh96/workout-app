import { graphql } from 'msw'

import { GetExerciseDocument } from '@/graphql/generated/operations-csr'

import { exercise } from './fixture'

export const handleGetExercise = (args?: {
  status?: number
  loadingInfinite?: boolean
}) => {
  return graphql.query(GetExerciseDocument, (req, res, ctx) => {
    if (args?.status === 200)
      return res(
        ctx.status(200),
        ctx.delay(args.loadingInfinite ? 'infinite' : 100)
      )
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some errors' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(exercise))
  })
}
