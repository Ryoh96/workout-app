import { forwardRef, useId } from 'react'

import Switch from '@/components/atoms/Switch'

type Props = {
  label: string
  labelVisible?: boolean
} & React.ComponentPropsWithoutRef<typeof Switch>

const SwitchWithLabel = forwardRef<HTMLInputElement, Props>(
  function SwitchWithLabel({ label, labelVisible = true, ...props }, ref) {
    const id = useId()
    return (
      <div className="flex items-center mb-2">
        <label
          htmlFor={id}
          className={`text-sm mr-2 ${!labelVisible && 'sr-only'} `}
        >
          {label}
        </label>
        <Switch id={id} ref={ref} {...props} />
      </div>
    )
  }
)

export default SwitchWithLabel
