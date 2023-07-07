import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'
import InputCounter from '@/components/atoms/InputCounter'
import TextAreaWithInfo from '@/components/molecules/TextAreaWithInfo'
import type { CreateMemoInput } from '@/libs/schema/createMemo'
import { createMemoSchema } from '@/libs/schema/createMemo'

type Props<T extends FieldValues = CreateMemoInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  handleCancel?: () => void
}

const CreateMemoForm = ({
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
  } = useForm<CreateMemoInput>({
    defaultValues,
    resolver: zodResolver(createMemoSchema),
  })

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div className="my-7">
        <TextAreaWithInfo
          label="メモ"
          placeholder="メモ"
          {...register('memo')}
          inputCounter={
            <InputCounter name="memo" control={control} max={100} />
          }
          error={errors.memo?.message}
          rows={5}
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

export default CreateMemoForm
