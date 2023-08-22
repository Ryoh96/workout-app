import { graphql } from 'msw'

import { GetPinnedMemosByExercisesDocument } from '@/graphql/generated/operations-csr'

import { data, noData } from './fixture'

export const handleGetPinnedMemos = (args?: {
  status?: number
  loadingInfinite?: boolean
}) => {
  return graphql.query(GetPinnedMemosByExercisesDocument, (req, res, ctx) => {
    if (args?.status === 200)
      return res(
        ctx.status(200),
        ctx.delay(args.loadingInfinite ? 'infinite' : 100)
      )

    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some errors' }]))

    if (args?.status === 204) return res(ctx.data(noData))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(data))
  })
}
