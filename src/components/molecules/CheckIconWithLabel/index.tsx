import clsx from 'clsx'
import type { ReactNode } from 'react'
import { forwardRef, useId, useRef } from 'react'

import CheckedIcon from '@/components/atoms/CheckIcon'

type Props = {
  label: string
  labelHidden?: boolean
  icon: ReactNode
} & React.ComponentPropsWithoutRef<'input'>

const CheckIconWithLabel = forwardRef<HTMLInputElement, Props>(
  function CheckIconWithLabel(
    { icon, label, labelHidden = false, ...props },
    ref
  ) {
    const id = useId()
    return (
      <label
        className={clsx(
          `${labelHidden && 'hidden'} flex items-center gap-1 cursor-pointer`,
          props.className
        )}
        htmlFor={id}
      >
        <CheckedIcon icon={icon} ref={ref} id={id} {...props} />
        <span className="select-none text-sm">{label}</span>
      </label>
    )
  }
)

export default CheckIconWithLabel
