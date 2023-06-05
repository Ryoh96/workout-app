import type { Resolvers } from '../../generated/resolvers-types'
import { exercise } from './exercise'
import { exerciseByDate } from './exerciseByDate'
import { exercises } from './exercises'
import { maxTotalLoad } from './maxTotalLoad'
import { maxWeight } from './maxWeight'
import { note } from './note'
import { noteById } from './noteById'
import { notes } from './notes'
import { part } from './part'
import { parts } from './parts'
import { previousTraining } from './previousTraining'
import { round } from './round'
import { rounds } from './rounds'

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
  previousTraining,
  maxWeight,
  maxTotalLoad,
}
