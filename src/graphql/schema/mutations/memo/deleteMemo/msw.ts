import { graphql } from 'msw'

import { DeleteMemoDocument } from '@/graphql/generated/operations-csr'

import { deleteMemo } from './fixture'

export const handleDeleteMemo = (args?: { status?: number }) => {
  return graphql.mutation(DeleteMemoDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(deleteMemo))
  })
}
