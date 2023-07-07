import type { SelectOption } from '@/types'

export const unitOptions = [
  {
    name: 'kg',
    value: 'kg',
  },
  {
    name: 'lb',
    value: 'lb',
  },
]

export const LB_VALUE = 2.2046

export const lineColors = [
  ['rgb(255, 99, 99)', 'rgba(255, 99, 99, 0.5)'],
  ['rgb(53, 162, 235)', 'rgba(53, 162, 235, 0.5)'],
  ['rgb(53, 235, 59)', 'rgba(53, 235, 83, 0.5)'],
  ['rgb(171, 235, 53)', 'rgba(196, 235, 53, 0.5)'],
  ['rgb(99, 53, 235)', 'rgba(80, 53, 235, 0.5)'],
  ['rgb(235, 53, 165)', 'rgba(235, 53, 199, 0.5)'],
  ['rgb(235, 168, 53)', 'rgba(235, 177, 53, 0.5)'],
  ['rgb(53, 235, 211)', 'rgba(53, 235, 177, 0.5)'],
  ['rgba(171, 235, 53, 0)', 'rgba(196, 235, 53, 0)'],
  ['rgb(132, 132, 132)', 'rgba(123, 123, 123, 0.5)'],
]

export const spanOptions: SelectOption[] = [
  {
    name: '3日間',
    value: '3',
  },
  {
    name: '5日間',
    value: '5',
  },
  {
    name: '10日間',
    value: '10',
  },
  {
    name: '30日間',
    value: '30',
  },
  {
    name: '60日間',
    value: '60',
  },
  {
    name: '90日間',
    value: '90',
  },
  {
    name: '180日間',
    value: '180',
  },
  {
    name: '360日間',
    value: '360',
  },
  {
    name: '全期間',
    value: '-1',
  },
]

export const setOptions = [...Array(10)].map((_, index) => ({
  name: `${index + 1}set`,
  value: `${index + 1}`,
}))
