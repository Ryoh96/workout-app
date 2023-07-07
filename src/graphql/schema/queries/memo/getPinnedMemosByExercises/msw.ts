import { graphql } from 'msw'

import { GetPinnedMemosByExercisesDocument } from '@/graphql/generated/operations-csr'

import { data } from './fixture'

export const handleGetPinnedMemos = (args?: { status?: number }) => {
  return graphql.query(GetPinnedMemosByExercisesDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some errors' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(data))
  })
}
