import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'
import InputCounter from '@/components/atoms/InputCounter'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import TextBoxWithInfo from '@/components/molecules/TextBoxWithInfo'
import type { CreateExerciseInput } from '@/libs/schema/createExercise'
import { createExerciseSchema } from '@/libs/schema/createExercise'
import type { ComboBoxOption } from '@/types'

type Props<T extends FieldValues = CreateExerciseInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  onCancel: () => void
  partsOptions: ComboBoxOption[]
  selected?: string
  id: string
}

const AddExerciseForm = ({
  partsOptions,
  selected,
  onCancel,
  id,
  ...props
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateExerciseInput>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(createExerciseSchema),
  })
  return (
    <form
      onSubmit={handleSubmit(props.onValid, props.onInvalid)}
      aria-labelledby={id}
    >
      <div className="space-y-8">
        <div className="w-full">
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
        <div>
          <TextBoxWithInfo
            label="新規種目名"
            error={errors.exercise?.message}
            inputCounter={
              <InputCounter name="exercise" control={control} max={30} />
            }
            {...register('exercise')}
          />
        </div>
        <div className="flex justify-center gap-4">
          <Button type="submit">登録</Button>
          <Button type="reset" onClick={onCancel}>
            キャンセル
          </Button>
        </div>
      </div>
    </form>
  )
}

export default AddExerciseForm
