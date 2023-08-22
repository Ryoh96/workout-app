import type { GetPinnedMemosByExercisesQuery } from '@/graphql/generated/operations-csr'

export const data: GetPinnedMemosByExercisesQuery = {
  pinnedMemos: [
    {
      content: '肩幅を寄せる',
      createdAt: '2023-06-24T15:43:02.152Z',
      id: 'a89f1d47-21c0-41b0-8bf0-baba5260f12f',
    },
    {
      content: 'ネガティブの動作を意識する',
      createdAt: '2023-06-29T14:46:49.715Z',
      id: 'f9374f8b-33da-4538-a2ac-785443c2b199',
    },
  ],
}

export const noData: GetPinnedMemosByExercisesQuery = {
  pinnedMemos: [],
}

export const hasLongMemData: GetPinnedMemosByExercisesQuery = {
  pinnedMemos: [
    {
      content:
        'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお',
      createdAt: '2023-06-24T15:43:02.152Z',
      id: 'a89f1d47-21c0-41b0-8bf0-baba5260f12f',
    },
    {
      content: 'ネガティブの動作を意識する',
      createdAt: '2023-06-29T14:46:49.715Z',
      id: 'f9374f8b-33da-4538-a2ac-785443c2b199',
    },
  ],
}
