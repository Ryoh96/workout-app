import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'
import InputCounter from '@/components/atoms/InputCounter'
import TextBoxWithInfo from '@/components/molecules/TextBoxWithInfo'
import type { RenameExerciseInput } from '@/libs/schema/renameExercise'
import { renameExerciseSchema } from '@/libs/schema/renameExercise'

type Props<T extends FieldValues = RenameExerciseInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  handleCancel?: () => void
}

const RenameExerciseForm = ({
  defaultValues,
  onValid,
  onInvalid,
  handleCancel,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RenameExerciseInput>({
    defaultValues,
    resolver: zodResolver(renameExerciseSchema),
  })

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div className="my-7">
        <TextBoxWithInfo
          label="種目名"
          placeholder="種目名"
          {...register('exercise')}
          inputCounter={
            <InputCounter name="exercise" control={control} max={30} />
          }
          error={errors.exercise?.message}
          testPrefix="renameExercise"
        />
      </div>
      <div className="flex justify-center gap-5">
        <Button type="submit">保存</Button>
        <Button type="reset" onClick={handleCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  )
}

export default RenameExerciseForm
