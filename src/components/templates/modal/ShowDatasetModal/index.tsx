import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'
import type { ReactNode } from 'react'

import Modal from '@/components/organisms/Modal'

type Props = {
  title: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: ReactNode
}

const ShowDatasetModal = ({ isOpen, setIsOpen, content, title }: Props) => {
  return (
    <Modal
      title={title}
      titleIcon={<MagnifyingGlassCircleIcon />}
      content={content}
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      handlers={[
        {
          name: '閉じる',
          handleClick: () => setIsOpen(false),
        },
      ]}
    />
  )
}

export default ShowDatasetModal
