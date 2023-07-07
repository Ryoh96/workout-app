import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'
import InputAlarm from '@/components/molecules/InputAlarm'
import type { SetAlarmInput } from '@/libs/schema/SetAlarm'
import { setAlarmSchema } from '@/libs/schema/setAlarm'

type Props<T extends FieldValues = SetAlarmInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  handleCancel?: () => void
  hasCancelButton?: boolean
}

const SetAlarmForm = ({
  defaultValues,
  onValid,
  onInvalid,
  handleCancel,
  hasCancelButton = true,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetAlarmInput>({
    defaultValues,
    resolver: zodResolver(setAlarmSchema),
  })

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div className="my-7">
        <InputAlarm
          register={register}
          errors={errors}
          label="アラームの設定"
        />
      </div>
      <div className="flex justify-center gap-5">
        <Button type="submit">設定</Button>
        {hasCancelButton && (
          <Button type="reset" onClick={handleCancel}>
            キャンセル
          </Button>
        )}
      </div>
    </form>
  )
}

export default SetAlarmForm
