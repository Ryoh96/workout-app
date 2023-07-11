import { BookmarkIcon } from '@heroicons/react/24/solid'
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
import CheckIconWithLabel from '@/components/molecules/CheckIconWithLabel'
import InputTime from '@/components/molecules/InputTime'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import TextAreaWithInfo from '@/components/molecules/TextAreaWithInfo'
import TextBoxWithInfo from '@/components/molecules/TextBoxWithInfo'
import { unitOptions } from '@/constants'
import type { Round } from '@/graphql/generated/operations-type'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import { upsertRoundSchema } from '@/libs/schema/upsertRound'

type Props<T extends FieldValues = UpsertRoundInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  id?: string
  handleCancel?: () => void
  previousData?: Partial<Round>
  previousLoading?: boolean
  loading: boolean
}

const RoundForm = ({ id, previousData, previousLoading, loading, ...props }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpsertRoundInput>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(upsertRoundSchema),
  })
  return (
    <div>
      <form
        onSubmit={handleSubmit(props.onValid, props.onInvalid)}
        className="space-y-7"
        aria-labelledby={id}
      >
        <div>
          <TextBoxWithInfo
          inputMode='numeric'
            label="重量"
            {...register('weight', { valueAsNumber: true })}
            error={errors.weight?.message}
            info={
              !previousLoading && (
                <EmphasizedText
                  content={previousData?.weight ?? '--'}
                  unit="kg"
                />
              )
            }
            placeholder="-- kg"
            unit={
              <SelectBoxWithLabel
                options={unitOptions}
                labelVisible={false}
                label="単位"
                defaultValue="kg"
                {...register('unit')}
              />
            }
          />
        </div>
        <div>
          <TextBoxWithInfo
          inputMode='numeric'
            label="回数"
            placeholder="-- 回"
            {...register('repetition', { valueAsNumber: true })}
            error={errors.repetition?.message}
            info={
              !previousLoading && (
                <EmphasizedText
                  content={previousData?.repetition ?? '--'}
                  unit="回"
                />
              )
            }
            unit="回"
          />
        </div>
        <div>
          <InputTime
            label="インターバル"
            register={register}
            errors={errors}
            info={
              !previousLoading && (
                <EmphasizedText
                  content={
                    previousData?.interval
                      ? `${Math.floor(previousData?.interval / 60)}:${
                          previousData?.interval % 60
                        }`
                      : '--:--'
                  }
                />
              )
            }
          />
        </div>
        <div>
          <TextAreaWithInfo
            label="メモ"
            placeholder="メモ"
            {...register('memo')}
            info={
              <CheckIconWithLabel
                label="固定"
                icon={<BookmarkIcon />}
                {...register('pin')}
                className="mr-2"
              />
            }
            error={errors.memo?.message}
            inputCounter={
              <InputCounter name="memo" control={control} max={100} />
            }
          />
        </div>
        <div className="flex justify-center gap-5">
          <Button type="submit" loading={loading}>完了</Button>
          <Button type="reset" onClick={props.handleCancel}>
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RoundForm
