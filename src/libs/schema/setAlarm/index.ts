import * as z from 'zod'

export const setAlarmSchema = z.object({
  minutes: z
    .number({ invalid_type_error: '数値を入力してください' })
    .nonnegative('0以上の値を入力してください')
    .lte(99, '入力できる数字は99分までです')
    .optional(),
  seconds: z
    .number({ invalid_type_error: '数値を入力してください' })
    .nonnegative('0以上の値を入力してください')
    .lte(59, '入力できる数字は59秒までです')
    .optional(),
})

export type SetAlarmInput = z.infer<typeof setAlarmSchema>
