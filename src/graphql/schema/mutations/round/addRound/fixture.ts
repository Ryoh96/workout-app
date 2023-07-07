import type { AddRoundMutation } from '@/graphql/generated/operations-csr'

export const addRound: AddRoundMutation = {
  addRound: {
    id: 'db3d55ce-3da6-4eb4-bce6-a4b2e773dd68',
    weight: 30,
    repetition: 13,
    interval: 90,
    unit: 'KG',
    memo: {
      content: '腕を伸ばして',
      pin: true,
      __typename: 'Memo',
    },
    createdAt: '2023-07-03T10:53:15.687Z',
    __typename: 'Round',
  },
}
