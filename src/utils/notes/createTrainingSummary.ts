import type {
  GetNoteQuery,
  Training,
} from '@/graphql/generated/operations-type'

const createTrainingSummary = (trainings: Training[]) => {
  const results = [] as {
    part: string
    totalTrainings: number
    totalLoad: number
    totalSet: number
    totalReps: number
  }[]

  trainings.map((training) => {
    const part = training.exercise?.parts?.[0].name as string
    const index = results.findIndex((result) => result.part === part)
    if (index >= 0) {
      results[index].totalTrainings += 1
      results[index].totalLoad += training.totalLoad ?? 0
      results[index].totalSet += training.rounds?.length ?? 0
      results[index].totalReps +=
        training.rounds?.reduce(
          (accumulator, round) => accumulator + round.repetition,
          0
        ) ?? 0
    } else {
      results.push({
        part,
        totalTrainings: 1,
        totalLoad: training.totalLoad ?? 0,
        totalSet: training.rounds?.length ?? 0,
        totalReps:
          training.rounds?.reduce(
            (accumulator, round) => accumulator + round.repetition,
            0
          ) ?? 0,
      })
    }
  })

  return results
}

export default createTrainingSummary
