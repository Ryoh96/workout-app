import * as z from 'zod'

export const changeExercisePartSchema = z.object({
  part: z.string({
    required_error: '入力してください',
    invalid_type_error: '文字列を入力してください',
  }),
})

export type ChangeExercisePartInput = z.infer<typeof changeExercisePartSchema>
