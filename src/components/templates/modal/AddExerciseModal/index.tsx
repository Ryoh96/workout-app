import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import { useAddExerciseByPartMutation } from '@/graphql/generated/operations-csr'
import type { ComboBoxOption } from '@/types'

import AddExerciseForm from './AddExerciseForm'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCompleted: () => void
  partsOptions: ComboBoxOption[]
  parts: ComboBoxOption
}

const AddExerciseModal = ({
  isOpen,
  setIsOpen,
  onCompleted,
  partsOptions,
  parts,
}: Props) => {
  const [addExerciseByPartMutation, { loading }] = useAddExerciseByPartMutation(
    {
      onCompleted,
    }
  )

  return (
    <Modal
      title="種目の追加"
      titleIcon={<FontAwesomeIcon icon={faDumbbell} />}
      content={
        <AddExerciseForm
          loading={loading}
          onValid={async (data) => {
            try {
              await toast.promise(
                addExerciseByPartMutation({
                  variables: {
                    name: data.exercise,
                    partId: data.part,
                  },
                }),
                {
                  error: {
                    render({ data }) {
                      //@ts-ignore
                      console.error(data.message)
                      return `エラーが発生しました`
                    },
                  },
                  success: '登録完了',
                  pending: '登録中',
                },
                {
                  autoClose: 3000,
                }
              )
            } catch (error) {
              console.error(error)
            } finally {
              setIsOpen(false)
            }
          }}
          onInvalid={(e) => {
            console.error(e)
          }}
          partsOptions={partsOptions}
          onCancel={() => setIsOpen(false)}
          id={''}
          selected={`${parts.id}`}
        />
      }
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    />
  )
}

export default AddExerciseModal
