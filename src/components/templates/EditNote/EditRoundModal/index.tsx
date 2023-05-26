import type { ApolloQueryResult } from '@apollo/client/core/types'
import { useCallback } from 'react'
import type { DeepPartial } from 'react-hook-form/dist/types/utils'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'
import RoundForm from '@/components/organisms/RoundForm'
import { Unit, useEditRoundMutation } from '@/graphql/generated/operations-csr'
import type {
  GetNoteByIdQuery,
  Round,
} from '@/graphql/generated/operations-type'
import type { Exact } from '@/graphql/generated/resolvers-types'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'

type Props = {
  editedRound: DeepPartial<Round> | null
  refetch: (
    variables?:
      | Partial<
          Exact<{
            id: string
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetNoteByIdQuery>>
  noteId: string | null
  setEditedRound: React.Dispatch<
    React.SetStateAction<DeepPartial<Round> | null>
  >
  setIsOpenEditRoundModal: React.Dispatch<React.SetStateAction<boolean>>
  isOpenEditRoundModal: boolean
}

export const EditRoundModal = ({
  editedRound,
  refetch,
  noteId,
  setEditedRound,
  setIsOpenEditRoundModal,
  isOpenEditRoundModal,
}: Props) => {
  const [editRoundMutation] = useEditRoundMutation({
    onCompleted: () => refetch({ id: noteId as string }),
    onError: (error) => {
      console.error(error)
    },
  })

  const handleEditRound = useCallback(
    async ({
      weight,
      repetition,
      minutes,
      seconds,
      unit,
    }: UpsertRoundInput) => {
      const interval =
        minutes || seconds ? (minutes ?? 0) * 60 + (seconds ?? 0) : undefined

      const id = editedRound?.id

      if (!id) {
        throw new Error('セットが存在しません')
      }

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
              },
            },
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
        },
        {
          autoClose: 3000,
        }
      )
      setEditedRound(null)
    },
    [editRoundMutation, editedRound?.id, setEditedRound]
  )

  return (
    <Modal
      title="セットの編集"
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
        />
      }
      isOpen={isOpenEditRoundModal}
      closeModal={() => setIsOpenEditRoundModal(false)}
    />
  )
}
