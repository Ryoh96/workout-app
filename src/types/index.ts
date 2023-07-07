import type { Round } from '@/graphql/generated/operations-type'

export type ComboBoxOption = {
  id: number | string
  name: string
}

export type StatData = {
  rounds?: Round[]
  date?: string
  totalLoad?: number | null
}[]

export type NoteSummary = {
  part: string
  totalTrainings: number
  totalLoad: number
  totalSet: number
  totalReps: number
}

export type SelectOption = {
  name: string | number
  value: string
  selected?: boolean
}
