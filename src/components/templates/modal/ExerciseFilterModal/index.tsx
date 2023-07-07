import {
  AdjustmentsHorizontalIcon,
  CircleStackIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'

import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import Modal from '@/components/organisms/Modal'
import { setOptions, spanOptions } from '@/constants'
import type { SelectOption } from '@/types'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  span?: number
  round?: number
  setSpan?: React.Dispatch<React.SetStateAction<number>>
  setRound?: React.Dispatch<React.SetStateAction<number>>
}

const ExerciseFilterModal = ({
  isOpen,
  setIsOpen,
  setSpan,
  setRound,
  span,
  round,
}: Props) => {
  return (
    <Modal
      title="フィルター"
      titleIcon={<AdjustmentsHorizontalIcon />}
      content={
        <div className="space-y-6">
          {setSpan && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 mt-0.5">
                <ClockIcon className="w-5 h-5 text-indigo-700" />
                <p className="whitespace-nowrap ">期間:</p>
              </div>

              <SelectBoxWithLabel
                options={spanOptions as SelectOption[]}
                variant="middle"
                label="期間"
                labelVisible={false}
                defaultValue={span}
                handleChange={(data) => {
                  setSpan(Number(data))
                }}
              />
            </div>
          )}
          {setRound && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 mt-0.5">
                <CircleStackIcon className="w-5 h-5 text-indigo-700" />
                <p className="whitespace-nowrap ">セット数:</p>
              </div>

              <div>
                <SelectBoxWithLabel
                  label="セット数"
                  labelVisible={false}
                  options={setOptions}
                  variant="middle"
                  defaultValue={round}
                  handleChange={(data) => {
                    setRound(Number(data))
                  }}
                />
              </div>
            </div>
          )}
        </div>
      }
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

export default ExerciseFilterModal
