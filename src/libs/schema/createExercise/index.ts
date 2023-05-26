import * as z from 'zod'

export const createExerciseSchema = z.object({
  part: z.string({
    required_error: '入力してください',
    invalid_type_error: '文字列を入力してください',
  }),
  exercise: z
    .string({
      required_error: '入力してください',
      invalid_type_error: '文字列を入力してください',
    })
    .max(30, '入力できる文字数は30文字までです'),
})

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>
