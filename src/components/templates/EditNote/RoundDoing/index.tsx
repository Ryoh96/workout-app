import { useId } from 'react'
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'

import RoundForm from '@/components/organisms/RoundForm'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'

type Props<T extends FieldValues = UpsertRoundInput> = {
  defaultValues?: Partial<T>
  onValid: SubmitHandler<T>
  onInvalid?: SubmitErrorHandler<T>
  isDone?: Boolean
  title?: string
  createdAt?: string
  handleCancel?: () => void
}

export const RoundDoing = ({ title, createdAt, ...props }: Props) => {
  const id = useId()
  return (
    <>
      <p
        className="text-center text-xl mb-4 pb-2 border-b border-gray-300"
        id={id}
      >
        {title}
      </p>
      <div className="flex text-sm justify-between">
        <span>前回の記録</span>
        <span>{createdAt}</span>
      </div>
      <RoundForm id={id} {...props} />
    </>
  )
}
