import HorizontalTable from '@/components/molecules/HorizontalTable'
import { dateFormat } from '@/utils/dateFormat'
import transposeMatrix from '@/utils/transposeMatrix'

type Props = {
  data: number[][]
  dates: Date[]
}

const WeightsDataTables = ({ data, dates }: Props) => {
  const normalizedData = transposeMatrix(data).reverse()
  const normalizedDates = dates.reverse()

  return (
    <div className="space-y-6 max-w-xs">
      {normalizedData.map((datum, index) => (
        <HorizontalTable
          key={index}
          title={dateFormat(normalizedDates[index], true) as string}
          data={datum.map((d, i) => ({
            heading: `${i + 1}set`,
            content: (
              <p>
                <span className="text-lg mr-0.5 font-bold">{d}</span>kg
              </p>
            ),
          }))}
        />
      ))}
    </div>
  )
}

export default WeightsDataTables
