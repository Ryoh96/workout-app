import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import { useRenameExerciseMutation } from '@/graphql/generated/operations-csr'
import type { RenameExerciseInput } from '@/libs/schema/renameExercise'

import RenameExerciseForm from './RenameExerciseForm'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  defaultValue?: Partial<RenameExerciseInput>
  onCompleted: () => void
  id: string
}

const RenameExerciseModal = ({
  defaultValue,
  isOpen,
  setIsOpen,
  onCompleted,
  id,
}: Props) => {
  const [renameExercise] = useRenameExerciseMutation({
    onCompleted,
  })
  return (
    <Modal
      title="種目名の編集"
      titleIcon={<PencilSquareIcon />}
      content={
        <RenameExerciseForm
          defaultValues={defaultValue}
          onValid={async (data) => {
            try {
              await toast.promise(
                renameExercise({
                  variables: {
                    id,
                    name: data.exercise,
                  },
                }),
                {
                  error: {
                    render({ data }) {
                      //@ts-ignore
                      return `${data.message}`
                    },
                  },
                  success: '登録完了',
                  pending: '登録中',
                },
                {
                  autoClose: 3000,
                }
              )
              setIsOpen(false)
            } catch (error) {
              console.error(error)
            }
          }}
          handleCancel={() => setIsOpen(false)}
        />
      }
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    />
  )
}

export default RenameExerciseModal
