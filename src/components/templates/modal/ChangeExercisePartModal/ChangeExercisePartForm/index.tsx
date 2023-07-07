import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import type { ChangeExercisePartInput } from '@/libs/schema/changeExercisePart'
import { changeExercisePartSchema } from '@/libs/schema/changeExercisePart'
import type { ComboBoxOption } from '@/types'

type Props<T extends FieldValues = ChangeExercisePartInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  handleCancel?: () => void
  partsOptions: ComboBoxOption[]
  selected?: string
}

const ChangeExercisePartForm = ({
  defaultValues,
  onValid,
  onInvalid,
  handleCancel,
  partsOptions,
  selected,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ChangeExercisePartInput>({
    defaultValues,
    resolver: zodResolver(changeExercisePartSchema),
  })

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div className="w-full mb-7">
        <SelectBoxWithLabel
          label="部位"
          options={partsOptions.map((option) => ({
            name: option.name,
            value: `${option.id}`,
          }))}
          defaultValue={selected}
          {...register('part')}
          variant="large"
          labelPosition="top"
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

export default ChangeExercisePartForm
