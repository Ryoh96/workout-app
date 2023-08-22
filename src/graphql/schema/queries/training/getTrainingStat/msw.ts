import { graphql } from 'msw'

import { GetTrainingStatDocument } from '@/graphql/generated/operations-ssg'

import { noData, trainingStat } from './fixture'

export const handleGetTrainingStat = (args?: {
  status?: number
  loadingInfinite?: boolean
}) => {
  return graphql.query(GetTrainingStatDocument, (req, res, ctx) => {
    if (args?.status === 200)
      return res(
        ctx.status(200),
        ctx.delay(args.loadingInfinite ? 'infinite' : 100)
      )
    if (args?.status === 204) return res(ctx.data(noData))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(trainingStat))
  })
}
