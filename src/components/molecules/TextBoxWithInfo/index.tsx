import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef, useId } from 'react'

import TextBox from '@/components/atoms/TextBox'

type Props = {
  label: string
  error?: string
  info?: ReactNode
  labelVisible?: boolean
  inputCounter?: ReactNode
  unit?: ReactNode
} & ComponentPropsWithoutRef<'input'>

const TextBoxWithInfo = forwardRef<HTMLInputElement, Props>(
  function TextBoxWithInfo(
    { label, info, error, inputCounter, unit, labelVisible = true, ...props },
    ref
  ) {
    const id = useId()
    const textboxId = `${id}-textbox`
    const errorMessageId = `${id}-error`

    return (
      <div>
        <div className={`pb-1`}>
          <label
            htmlFor={id}
            className={`text-sm pl-1 text-sky-800 font-bold ${
              !labelVisible && 'sr-only'
            }`}
          >
            {label}
          </label>
          <div className="float-right">{info}</div>
        </div>
        <div className="flex items-baseline">
          <TextBox
            {...props}
            ref={ref}
            id={textboxId}
            aria-invalid={!!error}
            aria-errormessage={errorMessageId}
            isError={!!error}
          />
          {unit && <span className="pl-2">{unit}</span>}
        </div>
        {inputCounter}
        {error && (
          <p
            className="text-xs text-red-600 pt-1 pl-1"
            id={errorMessageId}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

export default TextBoxWithInfo
