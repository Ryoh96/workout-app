import { PencilIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import Modal from '@/components/organisms/Modal'
import ShowMemos from '@/components/templates/common/ShowMemos'
import { useGetNoteMemoLazyQuery } from '@/graphql/generated/operations-csr'
import { noteIdState } from '@/recoil/Note/noteId'
import { ManipulationError } from '@/utils/errors'

import { CreateMemoModal } from './CreateMemoModal'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditMemoAtNoteModal = ({ isOpen, setIsOpen }: Props) => {
  const [isOpenCreateMemoModal, setIsOpenCreateMemoModal] = useState(false)
  const id = useRecoilValue(noteIdState)
  const [getNoteMemo, { data, loading, error, refetch }] =
    useGetNoteMemoLazyQuery({
      onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
    })
  const [defaultMemoValue, setDefaultMemoValue] = useState<string | undefined>(
    undefined
  )
  const [editMemoIndex, setEditMemoIndex] = useState<number | undefined>(
    undefined
  )
  useEffect(() => {
    if (!id) return
    getNoteMemo({ variables: { id } })
  }, [getNoteMemo, id])

  return (
    <>
      <Modal
        title="メモ"
        titleIcon={<PencilIcon />}
        content={
          <>
            {id ? (
              !error ? (
                <ShowMemos
                  data={data}
                  loading={loading}
                  onCompleted={() => refetch({ id })}
                  setDefaultValue={setDefaultMemoValue}
                  setIsOpenCreateMemoModal={setIsOpenCreateMemoModal}
                  setEditMemoIndex={setEditMemoIndex}
                />
              ) : (
                <p>エラーが発生しました</p>
              )
            ) : (
              <p>ノートがありません</p>
            )}
          </>
        }
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handlers={[
          {
            name: '新規作成',
            handleClick: () => {
              try {
                if (!id) {
                  throw new ManipulationError('ノートが存在しません')
                }
                setEditMemoIndex(undefined)
                setDefaultMemoValue(undefined)
                setIsOpenCreateMemoModal(true)
              } catch (error) {
                if (error instanceof ManipulationError) toast.error(error.message)
              } finally {
                setIsOpen(false)
              }
            },
          },
          {
            name: '閉じる',
            handleClick: () => setIsOpen(false),
          },
        ]}
      />
      {id && (
        <CreateMemoModal
          defaultValue={{ memo: defaultMemoValue }}
          isOpenCreateMemoModal={isOpenCreateMemoModal}
          setIsOpenCreateMemoModal={setIsOpenCreateMemoModal}
          setIsOpenEditMemoModal={setIsOpen}
          onCompleted={() => refetch({ id })}
          index={editMemoIndex}
        />
      )}
    </>
  )
}

export default EditMemoAtNoteModal
