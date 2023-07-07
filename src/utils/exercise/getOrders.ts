import type { GetAllTrainingsInNoteQuery } from '@/graphql/generated/operations-type'

const getOrders = (id: string, data?: GetAllTrainingsInNoteQuery) => {
  if (!data) return
  const orders = data?.notes
    ?.map((note) => ({
      order: note.trainings?.findIndex(
        (training) => training.exercise?.id === id
      ),
      date: note.date,
    }))
    .filter((elm) => elm.order !== -1)
  return orders
}

export default getOrders
