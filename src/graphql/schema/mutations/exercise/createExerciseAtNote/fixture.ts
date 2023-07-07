import type { CreateExerciseAtNoteMutation } from '@/graphql/generated/operations-csr'

export const createExerciseAtNote: CreateExerciseAtNoteMutation = {
  createExerciseAtNote: {
    id: 'hoge',
    name: 'ダンベルプレス',
    parts: [
      {
        name: '胸',
      },
    ],
  },
}
