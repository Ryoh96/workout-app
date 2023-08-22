import type { GetNoteMemoQuery } from '@/graphql/generated/operations-type'

export const noteMemo: GetNoteMemoQuery = {
  noteById: {
    memos: ['テスト1', 'テスト2', 'テスト3'],
  },
}

export const noData: GetNoteMemoQuery = {
  noteById: {
    memos: [],
  },
}
