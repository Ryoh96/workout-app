import { useWatch } from 'react-hook-form'

type Props = {
  max: number
  control: any
  name: string
}

const InputCounter = ({ max, name, control }: Props) => {
  const value = useWatch({ name, control })
  const current = value?.length || 0
  return (
    <div
      className={`text-right pr-1 text-xs text-gray-900 whitespace-nowrap  ${
        current > max && 'text-red-600'
      }`}
      data-invalid={current > max}
    >
      {current} / {max}
    </div>
  )
}

export default InputCounter
