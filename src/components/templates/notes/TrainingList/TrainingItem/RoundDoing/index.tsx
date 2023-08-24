import { useId } from 'react'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'

import RoundForm from '@/components/templates/notes/RoundForm'
import type { Training } from '@/graphql/generated/operations-type'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import { timeFormat } from '@/utils/dateFormat'

type Props<T extends FieldValues = UpsertRoundInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  isDone?: Boolean
  training: Training
  handleCancel?: () => void
  loading: boolean
}
const RoundDoing = ({ training, ...props }: Props) => {
  const id = useId()
  return (
    <>
      <p
        className="text-center text-xl mb-4 pb-2 border-b border-gray-300 mt-2"
        id={id}
        data-testid="round-doing"
      >
        {`${(training.rounds?.length ?? 0) + 1}set`}
      </p>
      <div className="flex text-sm justify-end">
        <span>作成：{timeFormat(new Date(training.createdAt))}</span>
      </div>
      <RoundForm id={id} {...props} />
    </>
  )
}

export default RoundDoing
