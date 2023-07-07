import type { UpsertMemoAtNoteMutation } from '@/graphql/generated/operations-csr'

export const upsertMemoAtNote: UpsertMemoAtNoteMutation = {
  upsertMemoAtNote: {
    id: 'hoge',
    memos: ['memo1', 'memo2'],
  },
}
