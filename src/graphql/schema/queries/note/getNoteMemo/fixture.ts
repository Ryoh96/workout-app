import type { GetNoteMemoQuery } from '@/graphql/generated/operations-type'

export const noteMemo: GetNoteMemoQuery = {
  noteById: {
    memos: ['テスト', 'テスト2', 'テスト3'],
  },
}
