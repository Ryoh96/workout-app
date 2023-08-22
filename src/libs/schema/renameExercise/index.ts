import * as z from 'zod'

export const renameExerciseSchema = z.object({
  exercise: z
    .string({
      required_error: '入力してください',
      invalid_type_error: '文字列を入力してください',
    })
    .min(1, '1文字以上入力してください')
    .max(30, '入力できる文字数は30文字までです'),
})

export type RenameExerciseInput = z.infer<typeof renameExerciseSchema>
