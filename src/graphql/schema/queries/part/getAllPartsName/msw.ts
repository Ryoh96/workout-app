import { graphql } from 'msw'

import { GetAllPartsNameDocument } from '@/graphql/generated/operations-ssg'

import { allPartsName } from './fixture'

export const handleGetAllPartName = (args?: { status?: number }) => {
  return graphql.query(GetAllPartsNameDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(allPartsName))
  })
}

