import HorizontalTable from '@/components/molecules/HorizontalTable'
import { dateFormat } from '@/utils/dateFormat'
import transposeMatrix from '@/utils/transposeMatrix'

type Props = {
  data: number[][]
  dates: Date[]
}

const TotalLoadDataTables = ({ data, dates }: Props) => {
  const normalizedData = transposeMatrix(data).reverse()
  const normalizedDates = [...dates].reverse()
  return (
    <div className="max-w-sm  rounded-lg">
      <table className="w-full border-collapse border">
        <tr className="bg-indigo-100 text-indigo-900 font-bold">
          <th className="p-3">日付</th>
          <td className="p-3 text-right">総負荷量(kg)</td>
        </tr>
        {normalizedData.map((datum, index) => (
          <tr key={index} className="border-b">
            <th className="px-2 py-3 mr-4  text-blue-900 whitespace-nowrap ">
              {dateFormat(normalizedDates[index], true) as string}
            </th>
            <td className="px-6 w-3/5 text-right whitespace-nowrap">
              <span className="text-lg mr-1 font-bold">{datum[0]}</span>kg
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default TotalLoadDataTables
