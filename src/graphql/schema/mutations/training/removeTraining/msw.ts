import { graphql } from 'msw'

import { RemoveTrainingDocument } from '@/graphql/generated/operations-csr'

import { removeTraining } from './fixture'

export const handleRemoveTraining = (args?: { status?: number }) => {
  return graphql.mutation(RemoveTrainingDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some error' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(removeTraining))
  })
}
