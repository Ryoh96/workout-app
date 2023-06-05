import { addExerciseByPart } from './addExerciseByPart'
import { addRound } from './addRound'
import { createNote } from './createNote'
import { createOrGetNoteId } from './createOrGetNoteId'
import { createTraining } from './createTraining'
import { editRound } from './editRound'
import { removeRound } from './removeRound'
import { removeTraining } from './removeTraining'

export const Mutation = {
  addExerciseByPart,
  addRound,
  createOrGetNoteId,
  createTraining,
  editRound,
  removeRound,
  removeTraining,
  createNote,
}
