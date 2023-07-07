import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BookOpenIcon,
  ChartBarIcon,
  PencilIcon,
} from '@heroicons/react/24/solid'

type Props = {
  dataRef: React.MutableRefObject<HTMLDivElement | null>
  graphRef: React.MutableRefObject<HTMLDivElement | null>
  memoRef: React.MutableRefObject<HTMLDivElement | null>
  noteRef: React.MutableRefObject<HTMLDivElement | null>
}

const ExerciseFooter = ({ dataRef, graphRef, memoRef, noteRef }: Props) => {
  return (
    <>
      <div className="fixed bg-gradient-to-r from-orange-600 to-rose-600 bottom-0 left-0 w-full py-2 flex gap-6 justify-center z-[101] sm:hidden">
        <button
          className="grid items-center justify-center  w-10"
          onClick={() =>
            dataRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <ChartBarIcon className="w-6 h-6 mx-auto text-white" />
          <span className="text-[10px] text-white">データ</span>
        </button>

        <button
          className="grid items-center justify-center  w-10"
          onClick={() =>
            memoRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <PencilIcon className="w-6 h-6 mx-auto text-white" />
          <span className="text-[10px] text-white">メモ</span>
        </button>
        <button
          className="grid items-center justify-center w-10"
          onClick={() =>
            graphRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <FontAwesomeIcon
            icon={faChartLine}
            className="w-6 h-6 mx-auto text-white "
          />
          <span className="text-[10px] text-white">グラフ</span>
        </button>
        <button
          className="grid items-center justify-center  w-10"
          onClick={() =>
            noteRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <BookOpenIcon className="w-6 h-6 mx-auto text-white" />
          <span className="text-[10px] text-white">ノート</span>
        </button>
      </div>
    </>
  )
}

export default ExerciseFooter
