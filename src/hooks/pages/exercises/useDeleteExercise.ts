import { useEffect, useState } from 'react'

import useDeleteExerciseModalStore from '@/store/modal/deleteExerciseModal'

type Exercise = {
  id: string
  name: string
}

export const useDeleteExercise = () => {
  const [deleteExercise, setDeleteExercise] = useState<Exercise | null>(null)

  const setIsOpenDeleteExerciseModal = useDeleteExerciseModalStore(
    (state) => state.setIsOpen
  )

  useEffect(() => {
    if (!deleteExercise) return
    setIsOpenDeleteExerciseModal(true)
  }, [deleteExercise, setIsOpenDeleteExerciseModal])

  return [deleteExercise, setDeleteExercise] as const
}
