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
  testPrefix?: string
} & ComponentPropsWithoutRef<'input'>

const TextBoxWithInfo = forwardRef<HTMLInputElement, Props>(
  function TextBoxWithInfo(
    {
      label,
      info,
      error,
      inputCounter,
      unit,
      testPrefix,
      labelVisible = true,
      ...props
    },
    ref
  ) {
    const id = useId()
    const textboxId = `${id}-textbox`
    const errorMessageId = `${id}-error`

    const errorMessageTestId = testPrefix
      ? `${testPrefix}-errorMessage`
      : 'errorMessage'

    return (
      <div>
        <div className="pb-1 flex items-end justify-between">
          <label
            htmlFor={textboxId}
            className={`text-sm pl-1 text-sky-800 font-bold ${
              !labelVisible && 'sr-only'
            }`}
          >
            {label}
          </label>
          <div className="ml-auto">{info}</div>
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
        <div className="flex items-center justify-between">
          {error && (
            <p
              className="text-xs text-red-600 pt-1 pl-1"
              id={errorMessageId}
              role="alert"
              data-testid={errorMessageTestId}
            >
              {error}
            </p>
          )}
          <div className="ml-auto">{inputCounter}</div>
        </div>
      </div>
    )
  }
)

export default TextBoxWithInfo
