import type { GetNoteQuery } from '@/graphql/generated/operations-type'

const getNoteSummary = (noteData?: GetNoteQuery) => {
  if (!noteData) return
  const results = [] as { part: string; totalLoad: number }[]
  noteData?.note?.trainings?.map((training) => {
    const part = training.exercise?.parts?.[0].name as string
    const index = results.findIndex((result) => result.part === part)
    if (index >= 0) {
      results[index].totalLoad += training.totalLoad ?? 0
      training.rounds?.reduce(
        (accumulator, round) => accumulator + round.repetition,
        0
      ) ?? 0
    } else {
      results.push({
        part,
        totalLoad: training.totalLoad ?? 0,
      })
    }
  })

  return results
}

export default getNoteSummary
