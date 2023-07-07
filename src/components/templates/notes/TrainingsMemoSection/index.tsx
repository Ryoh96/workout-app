import { PencilIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import Button from '@/components/atoms/Button'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import ShowMemos from '@/components/templates/common/ShowMemos'
import { CreateMemoModal } from '@/components/templates/modal/EditMemoAtNoteModal/CreateMemoModal'
import { useGetNoteMemoLazyQuery } from '@/graphql/generated/operations-csr'
import { noteIdState } from '@/recoil/Note/noteId'

const TrainingsMemoSection = () => {
  const noteId = useRecoilValue(noteIdState)

  const [defaultMemoValue, setDefaultMemoValue] = useState<string | undefined>(
    undefined
  )
  const [editMemoIndex, setEditMemoIndex] = useState<number | undefined>(
    undefined
  )
  const [isOpenCreateMemoModal, setIsOpenCreateMemoModal] = useState(false)
  const [isOpenEditMemoModal, setIsOpenEditMemoModal] = useState(false)

  const [getNoteMemo, { data, loading, refetch: refetchNoteMemo }] =
    useGetNoteMemoLazyQuery()

  useEffect(() => {
    if (!noteId) return
    getNoteMemo({ variables: { id: noteId } })
  }, [getNoteMemo, noteId])

  return (
    <Section>
      <TitleWithIcon as="h2" icon={<PencilIcon />}>
        メモ
      </TitleWithIcon>
      {noteId && (
        <ShowMemos
          data={data}
          loading={loading}
          setDefaultValue={setDefaultMemoValue}
          setIsOpenCreateMemoModal={setIsOpenCreateMemoModal}
          setEditMemoIndex={setEditMemoIndex}
          onCompleted={() => refetchNoteMemo({ id: noteId })}
        />
      )}
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => {
            try {
              if (!noteId) {
                throw new Error('ノートが存在しません')
              }
              setEditMemoIndex(undefined)
              setDefaultMemoValue(undefined)
              setIsOpenCreateMemoModal(true)
            } catch (error) {
              if (error instanceof Error) toast.error(error.message)
            } finally {
              setIsOpenEditMemoModal(false)
            }
          }}
        >
          新規作成
        </Button>
      </div>
      {noteId && (
        <CreateMemoModal
          defaultValue={{ memo: defaultMemoValue }}
          isOpenCreateMemoModal={isOpenCreateMemoModal}
          setIsOpenCreateMemoModal={setIsOpenCreateMemoModal}
          setIsOpenEditMemoModal={setIsOpenEditMemoModal}
          index={editMemoIndex}
          onCompleted={() => refetchNoteMemo({ id: noteId })}
        />
      )}
    </Section>
  )
}

export default TrainingsMemoSection
