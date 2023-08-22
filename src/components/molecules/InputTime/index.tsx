import type { ReactNode } from 'react'
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import type { UpsertRoundInput } from '@/libs/schema/upsertRound'

import TextBoxWithInfo from '../TextBoxWithInfo'

type Props<T extends FieldValues = UpsertRoundInput> = {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  info?: ReactNode
  label: string
}

const InputTime = ({ label, register, errors, info }: Props) => {
  return (
    <fieldset>
      <div>
        <div className="flex items-center justify-between">
          <legend className="text-sm pl-1 text-sky-800 font-bold">
            {label}
          </legend>
          <div className="float-right">{info}</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex-auto">
            <TextBoxWithInfo
              inputMode="numeric"
              label="分"
              labelVisible={false}
              placeholder="分"
              type="number"
              {...register('minutes', { valueAsNumber: true })}
              error={errors.minutes?.message}
              testPrefix="minutes"
            />
          </div>
          <span className="text-lg">:</span>
          <div className="flex-auto">
            <TextBoxWithInfo
              inputMode="numeric"
              label="秒"
              placeholder="秒"
              labelVisible={false}
              type="number"
              className="flex-auto"
              {...register('seconds', { valueAsNumber: true })}
              error={errors.seconds?.message}
              testPrefix="seconds"
            />
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default InputTime
