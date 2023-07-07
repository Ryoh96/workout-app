import { graphql } from 'msw'

import { GetMaxWeightDocument } from '@/graphql/generated/operations-ssg'

import { maxWeight } from './fixture'

export const handleGetMaxWeight = (args?: { status?: number }) => {
  return graphql.query(GetMaxWeightDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(maxWeight))
  })
}
