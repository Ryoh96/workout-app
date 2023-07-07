import type { Round as PrismaRound } from '@prisma/client'

import { LB_VALUE } from '@/constants'

const calcTotalLoad = (rounds: PrismaRound[]) => {
  const totalLoad = rounds.reduce((acc, round) => {
    const weight = Math.round(
      round.weight * (round.unit === 'LB' ? LB_VALUE : 1)
    )
    const repetition = round.repetition
    return acc + weight * repetition
  }, 0)

  return totalLoad
}

export default calcTotalLoad
