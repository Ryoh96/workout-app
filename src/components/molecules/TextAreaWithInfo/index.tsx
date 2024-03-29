import type { ComponentProps, ReactNode } from 'react'
import { forwardRef, useId } from 'react'

import TextArea from '@/components/atoms/TextArea'

type Props = ComponentProps<typeof TextArea> & {
  label: string
  inputCounter?: ReactNode
  error?: string
  info?: ReactNode
  testPrefix?: string
  labelVisible?: boolean
}

export const TextAreaWithInfo = forwardRef<HTMLTextAreaElement, Props>(
  function TextareaWithInfo(
    {
      label,
      inputCounter,
      error,
      info,
      testPrefix,
      labelVisible = true,
      ...props
    },
    ref
  ) {
    const componentId = useId()
    const textareaId = `${componentId}-textarea`
    const errorMessageId = `${componentId}-errorMessage`

    const errorMessageTestId = testPrefix
      ? `${testPrefix}-errorMessage`
      : 'errorMessage'
    return (
      <div>
        <div className="pb-1 flex items-end justify-between">
          <label
            htmlFor={textareaId}
            className={`text-sm pl-1 text-sky-800 font-bold ${
              !labelVisible && 'sr-only'
            }`}
          >
            {label}
          </label>
          <div className="ml-auto">{info}</div>
        </div>
        <TextArea
          {...props}
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-errormessage={errorMessageId}
          isError={!!error}
        />
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

export default TextAreaWithInfo
