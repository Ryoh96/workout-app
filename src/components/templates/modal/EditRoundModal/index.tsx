import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

import Modal from '@/components/organisms/Modal'
import RoundForm from '@/components/templates/notes/RoundForm'
import { Unit, useEditRoundMutation } from '@/graphql/generated/operations-csr'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import { editRoundModalState } from '@/recoil/Modal/EditRoundModal'
import { editRoundState } from '@/recoil/Round/editRound'

type Props = {
  onCompleted: () => void
}

const EditRoundModal = ({ onCompleted }: Props) => {
  const [editRoundMutation, {loading}] = useEditRoundMutation({
    onCompleted,
  })

  const [editedRound, setEditedRound] = useRecoilState(editRoundState)

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
        if (error instanceof Error) {
          console.error(error)
        }
      }
    },
    [editRoundMutation, editedRound?.id, setEditedRound]
  )

  const [isOpenEditRoundModal, setIsOpenEditRoundModal] =
    useRecoilState(editRoundModalState)

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
            setIsOpenEditRoundModal(false)
          }}
          handleCancel={() => setIsOpenEditRoundModal(false)}
            loading={loading}
        />
      }
      isOpen={isOpenEditRoundModal}
      closeModal={() => setIsOpenEditRoundModal(false)}
    />
  )
}

export default EditRoundModal
