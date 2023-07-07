import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React from 'react'
import { Pie } from 'react-chartjs-2'

import { lineColors } from '@/constants'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  datasets: {
    data: number[]
    label: string
  }[]
  labels: string[]
}

const PieChart = ({ datasets, labels }: Props) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: lineColors.map((lineColor) => lineColor[1]),
      borderColor: lineColors.map((lineColor) => lineColor[0]),
      borderWidth: 1,
    })),
  }

  return <Pie data={data} />
}

export default PieChart
