import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Button from '@/components/atoms/Button'
import EmphasizedText from '@/components/atoms/EmphasizedText'
import InputCounter from '@/components/atoms/InputCounter'
import Section from '@/components/layouts/Section'
import InputTime from '@/components/molecules/InputTime'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import SwitchWithLabel from '@/components/molecules/SwitchWithLabel'
import TextAreaWithInfo from '@/components/molecules/TextAreaWithInfo'
import TextBoxWithInfo from '@/components/molecules/TextBoxWithInfo'
import { unitOptions } from '@/constants'
import type { UpsertRoundInput } from '@/lib/schema/upsertRound'
import { upsertRoundSchema } from '@/lib/schema/upsertRound'

type Props<T extends FieldValues = UpsertRoundInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  onSave?: () => void
}

const RoundForm = (props: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpsertRoundInput>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(upsertRoundSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <Section>
      <>{errors.unit?.message}</>
      <form
        onSubmit={handleSubmit(props.onValid, props.onInvalid)}
        className="space-y-7"
      >
        <div>
          <TextBoxWithInfo
            label="重量"
            {...register('weight', { valueAsNumber: true })}
            error={errors.weight?.message}
            info={<EmphasizedText content={30} unit="kg" />}
            placeholder="-- kg"
            unit={
              <SelectBoxWithLabel
                options={unitOptions}
                labelVisible={false}
                label="単位"
                {...register('unit')}
              />
            }
          />
        </div>
        <div>
          <TextBoxWithInfo
            label="回数"
            placeholder="-- 回"
            {...register('repetition', { valueAsNumber: true })}
            error={errors.repetition?.message}
            info={<EmphasizedText content={12} unit="回" />}
            unit="回"
          />
        </div>
        <div>
          <InputTime
            label="インターバル"
            register={register}
            errors={errors}
            info={<EmphasizedText content={'1:30'} />}
          />
        </div>
        <div>
          <TextAreaWithInfo
            label="メモ"
            placeholder="メモ"
            {...register('memo')}
            info={<SwitchWithLabel label="固定" {...register('pin')} />}
            error={errors.memo?.message}
            inputCounter={
              <InputCounter name="memo" control={control} max={10} />
            }
          />
        </div>
        <div className="flex justify-center gap-5">
          <Button type="submit">セットの追加</Button>
          <Button type="submit">次の種目へ</Button>
        </div>
      </form>
    </Section>
  )
}

export default RoundForm
