import { BookOpenIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import Modal from '@/components/organisms/Modal'
import { useUpsertMemoAtNoteMutation } from '@/graphql/generated/operations-csr'
import type { CreateMemoInput } from '@/libs/schema/createMemo'
import { noteIdState } from '@/recoil/Note/noteId'

import CreateMemoForm from '../CreateMemoForm'

type Props = {
  isOpenCreateMemoModal: boolean
  setIsOpenCreateMemoModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenEditMemoModal: React.Dispatch<React.SetStateAction<boolean>>
  defaultValue?: Partial<CreateMemoInput>
  index?: number
  onCompleted: () => void
}

export const CreateMemoModal = ({
  isOpenCreateMemoModal,
  setIsOpenCreateMemoModal,
  setIsOpenEditMemoModal,
  defaultValue,
  index,
  onCompleted,
}: Props) => {
  const [createMemoAtNote] = useUpsertMemoAtNoteMutation({
    onCompleted,
  })

  const id = useRecoilValue(noteIdState)

  return (
    <Modal
      title="メモの作成"
      titleIcon={<BookOpenIcon />}
      content={
        <CreateMemoForm
          defaultValues={defaultValue}
          onValid={async (data) => {
            if (!id) throw new Error('ノートがありません')
            try {
              await toast.promise(
                createMemoAtNote({
                  variables: {
                    id,
                    memo: data.memo,
                    index,
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
              setIsOpenCreateMemoModal(false)
              setIsOpenEditMemoModal(true)
            } catch (error) {
              console.error(error)
            }
          }}
          handleCancel={() => {
            setIsOpenCreateMemoModal(false)
            setIsOpenEditMemoModal(true)
          }}
        />
      }
      isOpen={isOpenCreateMemoModal}
      closeModal={() => setIsOpenCreateMemoModal(false)}
    />
  )
}