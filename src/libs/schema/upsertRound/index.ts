import * as z from 'zod'

export const upsertRoundSchema = z.object({
  weight: z
    .number({
      required_error: '入力してください',
      invalid_type_error: '数値を入力してください',
    })
    .nonnegative('0以上の値を入力してください')
    .lte(999, '桁数が大きすぎます'),
  unit: z.enum(['kg', 'lb']),
  repetition: z
    .number({
      required_error: '入力してください',
      invalid_type_error: '数値を入力してください',
    })
    .nonnegative('0以上の値を入力してください')
    .lte(999, '桁数が大きすぎます'),
  minutes: z
    .number({ invalid_type_error: '数値を入力してください' })
    .nonnegative('0以上の値を入力してください')
    .lte(99, '桁数が大きすぎます')
    .optional(),
  seconds: z
    .number({ invalid_type_error: '数値を入力してください' })
    .nonnegative('0以上の値を入力してください')
    .optional(),
  memo: z.string().max(100, '入力できる文字数は100文字までです。').optional(),
  pin: z.boolean().optional(),
})

export type UpsertRoundInput = z.infer<typeof upsertRoundSchema>
