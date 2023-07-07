import { graphql } from 'msw'

import { GetPartNameDocument } from '@/graphql/generated/operations-ssg'

import { partName } from './fixture'

export const handleGetPartName = (args?: { status?: number }) => {
  return graphql.query(GetPartNameDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(partName))
  })
}
