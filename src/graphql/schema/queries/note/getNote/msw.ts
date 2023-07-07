import { graphql } from 'msw'

import { GetNoteDocument } from '@/graphql/generated/operations-csr'

import { note } from './fixture'

export const handleGetNote = (args?: { status?: number }) => {
  return graphql.query(GetNoteDocument, (req, res, ctx) => {
    if (args?.status === 200) return res(ctx.status(200), ctx.delay('infinite'))
    if (args?.status === 500)
      return res(ctx.status(500), ctx.errors([{ message: 'some errors' }]))

    if (args?.status) return res(ctx.status(args.status))
    return res(ctx.data(note))
  })
}
