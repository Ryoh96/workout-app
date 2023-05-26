import type { GetAllPartsNameQuery } from '@/graphql/generated/operations-type'

export const allPartsName: GetAllPartsNameQuery = {
  parts: [
    {
      id: 'a',
      name: '胸',
    },
    {
      id: 'b',
      name: '腕',
    },
    {
      id: 'c',
      name: '二頭',
    },
    {
      id: 'd',
      name: '三頭',
    },
    {
      id: 'e',
      name: '腹筋',
    },
  ],
}
