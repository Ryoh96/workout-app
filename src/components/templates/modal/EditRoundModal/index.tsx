import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import RoundForm from '@/components/templates/notes/RoundForm'
import { Unit, useEditRoundMutation } from '@/graphql/generated/operations-csr'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import useEditRoundModalStore from '@/store/modal/editRoundModal'
import useEditRoundStore from '@/store/round/editRound'
import { ManipulationError } from '@/utils/errors'

type Props = {
  onCompleted: () => void
}

const EditRoundModal = ({ onCompleted }: Props) => {
  const [editRoundMutation, { loading }] = useEditRoundMutation({
    onCompleted,
  })

  const { editedRound, setEditedRound } = useEditRoundStore((state) => ({
    editedRound: state.editedRound,
    setEditedRound: state.setEditRound,
  }))

  const handleEditRound = useCallback(
    async ({
      weight,
      repetition,
      minutes,
      seconds,
      unit,
      memo,
      pin,
    }: UpsertRoundInput) => {
      const interval =
        minutes || seconds ? (minutes ?? 0) * 60 + (seconds ?? 0) : undefined

      const id = editedRound?.id

      if (!id) {
        toast.error('セットが存在しません')
        return
      }

      try {
        await toast.promise(
          editRoundMutation({
            variables: {
              input: {
                id,
                roundInput: {
                  weight,
                  repetition,
                  interval,
                  unit: unit == 'kg' ? Unit.Kg : Unit.Lb,
                  memo,
                  isPinned: pin,
                },
              },
            },
          }),
          {
            success: '更新しました',
            pending: '更新中',
            error: {
              render({ data }) {
                //@ts-ignore
                return `${data.message}`
              },
            },
          },
          {
            autoClose: 3000,
          }
        )

        setEditedRound(null)
      } catch (error) {
        if (error instanceof ManipulationError) {
          console.error(error)
        }
      }
    },
    [editRoundMutation, editedRound?.id, setEditedRound]
  )

  const { isOpen, setIsOpen } = useEditRoundModalStore((state) => ({
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
  }))

  return (
    <Modal
      title="セットの編集"
      titleIcon={
        <FontAwesomeIcon
          icon={faFireFlameCurved}
          className="w-6 h-6 !text-red-600"
        />
      }
      content={
        <RoundForm
          defaultValues={{
            weight: editedRound?.weight,
            repetition: editedRound?.repetition,
            minutes: Math.floor((editedRound?.interval ?? 0) / 60),
            seconds: (editedRound?.interval ?? 0) % 60,
            memo: editedRound?.memo?.content,
            pin: editedRound?.memo?.pin ?? false,
          }}
          onValid={(data) => {
            handleEditRound(data)
            setIsOpen(false)
          }}
          handleCancel={() => setIsOpen(false)}
          loading={loading}
        />
      }
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    />
  )
}

export default EditRoundModal
