import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import { lineColors } from '@/constants'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Props = {
  datasets: {
    label: string
    data: number[]
  }[]
  labels?: string[]
}

export const LineChart = ({ datasets, labels }: Props) => {
  const options = {
    responsive: true,
  }

  const data = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: lineColors[index][0],
      backgroundColor: lineColors[index][1],
    })),
  }

  return <Line options={options} data={data} />
}
