import type { DeleteNoteMutation } from '@/graphql/generated/operations-csr'

export const deleteNote: DeleteNoteMutation = {
  deleteNote: {
    id: 'hoge',
  },
}
