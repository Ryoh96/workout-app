import type { GetNoteQuery } from '@/graphql/generated/operations-type'

export const note: GetNoteQuery = {
  note: {
    place: {
      name: '自宅',
    },
    parts: [
      {
        name: '胸',
      },
    ],
  },
}
