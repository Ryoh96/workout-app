import { graphql } from 'msw'

import { GetMaxTotalLoadDocument } from '@/graphql/generated/operations-ssg'

import { maxTotalLoad } from './fixture'

export const handleGetMaxToalLoad = (args?: { status?: number }) => {
  return graphql.query(GetMaxTotalLoadDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(maxTotalLoad))
  })
}