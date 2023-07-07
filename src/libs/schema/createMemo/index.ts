import * as z from 'zod'

export const createMemoSchema = z.object({
  memo: z
    .string()
    .max(100, '入力できる文字数は100文字までです。')
    .min(1, '文字を入力してください'),
})

export type CreateMemoInput = z.infer<typeof createMemoSchema>
