import type { Resolvers } from '../../generated/resolvers-types'
import { exercise, exerciseByDate, exercises } from './exercise'
import { memos, pinnedMemos } from './memo'
import { note, noteById, notes } from './note'
import { part, parts } from './part'
import { round, rounds } from './round'
import { maxTotalLoad, maxWeight } from './scalar'
import { previousTrainings, trainingsStat } from './training'

export const Query: Resolvers['Query'] = {
  parts,
  part,
  exercise,
  exercises,
  exerciseByDate,
  round,
  rounds,
  note,
  notes,
  noteById,
  maxWeight,
  maxTotalLoad,
  previousTrainings,
  memos,
  pinnedMemos,
  trainingsStat,
}
