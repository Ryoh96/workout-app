import type { ReactNode } from 'react'
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

import type { SetAlarmInput } from '@/libs/schema/setAlarms'

import TextBoxWithInfo from '../TextBoxWithInfo'

type Props<T extends FieldValues = SetAlarmInput> = {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  info?: ReactNode
  label: string
}

const InputAlarm = ({ label, register, errors, info }: Props) => {
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
              label="分"
              labelVisible={false}
              placeholder="分"
              type="number"
              {...register('minutes', { valueAsNumber: true })}
              error={errors.minutes?.message}
              inputMode="numeric"
            />
          </div>
          <span className="text-lg">:</span>
          <div className="flex-auto">
            <TextBoxWithInfo
              label="秒"
              placeholder="秒"
              labelVisible={false}
              type="number"
              className="flex-auto"
              {...register('seconds', { valueAsNumber: true })}
              error={errors.seconds?.message}
              inputMode="numeric"
            />
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default InputAlarm
