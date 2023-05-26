import Section from '@/components/layouts/Section'
import type { Unit } from '@/graphql/generated/operations-type'

type Props = {
  setCount: number
  weight: number
  unit: Unit
  repetition: number
  interval?: number | undefined | null
}

export const RoundDone = ({
  setCount,
  weight,
  unit,
  repetition,
  interval,
}: Props) => {
  const intervalToMinutes = interval
    ? `${Math.floor(interval / 60)}:${interval % 60}`
    : '--:--'
  return (
    <div className="flex justify-between w-9/12 mx-auto mb-2">
      <p>{setCount}set:</p>
      <div>
        {weight}
        {unit.toLocaleLowerCase()} &times; {repetition}reps (I-V:
        {intervalToMinutes})
      </div>
    </div>
  )
}
