import { BellAlertIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import Countdown from '@/components/atoms/CountDown'
import Modal from '@/components/organisms/Modal'

import SetAlarmForm from './SetAlermForm'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SetAlarmModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      <Modal
        titleIcon={<BellAlertIcon />}
        title="アラームの時間"
        content={
          <SetAlarmForm
            defaultValues={{ minutes: 0, seconds: 0 }}
            onValid={(data) => {
              const time = (data.minutes ?? 0) * 60 + (data.seconds ?? 0)
              setIsOpen(false)
              toast(<Countdown initialTime={time} />, {
                draggable: true,
                autoClose: time * 1000 + 3000,
              })
            }}
            handleCancel={() => setIsOpen(false)}
          />
        }
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  )
}

export default SetAlarmModal
