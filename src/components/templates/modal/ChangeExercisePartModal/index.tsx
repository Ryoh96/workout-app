import { faChild } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Modal from '@/components/organisms/Modal'
import {
  useChangeExercisePartMutation,
  useGetAllPartsNameQuery,
} from '@/graphql/generated/operations-csr'
import type { RenameExerciseInput } from '@/libs/schema/renameExercise'
import type { ComboBoxOption } from '@/types'

import ChangeExercisePartForm from './ChangeExercisePartForm'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  defaultValue?: Partial<RenameExerciseInput>
  onCompleted: () => void
  exerciseId: string
  selected: string
}

const ChangeExercisePartModal = ({
  defaultValue,
  isOpen,
  setIsOpen,
  onCompleted,
  exerciseId,
  selected,
}: Props) => {
  const [changeExercisePart] = useChangeExercisePartMutation({
    onCompleted,
  })

  const [parts, setParts] = useState<ComboBoxOption>()

  const { data: partData, loading } = useGetAllPartsNameQuery({
    onCompleted: (result) => {
      setParts(result.parts?.[0])
    },
  })

  const partsOptions = useMemo(() => partData?.parts, [partData])

  return (
    <Modal
      title="部位の変更"
      titleIcon={<FontAwesomeIcon icon={faChild} className="w-6 h-6" />}
      content={
        loading ? (
          <Spinner />
        ) : (
          <ChangeExercisePartForm
            partsOptions={partsOptions ?? []}
            selected={selected}
            onValid={async (data) => {
              try {
                await toast.promise(
                  changeExercisePart({
                    variables: {
                      partId: data.part,
                      exerciseId,
                    },
                  }),
                  {
                    error: {
                      render({ data }) {
                        //@ts-ignore
                        console.error(data.message)
                        return 'エラーが発生しました'
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
            handleCancel={() => setIsOpen(false)}
          />
        )
      }
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    />
  )
}

export default ChangeExercisePartModal
