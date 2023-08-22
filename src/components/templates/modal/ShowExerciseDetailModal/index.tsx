import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

import Modal from '@/components/organisms/Modal'

import ExerciseDetail from './ExerciseDetail'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  name: string
}
const ShowExerciseDetailModal = ({ isOpen, setIsOpen, id, name }: Props) => {
  const router = useRouter()
  return (
    <Modal
      title="種目詳細"
      titleIcon={<MagnifyingGlassIcon />}
      content={<ExerciseDetail id={id} name={name} />}
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      handlers={[
        {
          name: '詳細を見る',
          handleClick: () => router.push(`/exercises/${id}`),
        },
        {
          name: '閉じる',
          handleClick: () => setIsOpen(false),
        },
      ]}
    />
  )
}

export default ShowExerciseDetailModal
