import { addExerciseByPart, deleteExercise, renameExercise } from './exercise'
import { deleteMemo } from './memo'
import {
  createNote,
  deleteMemoAtNote,
  deleteNote,
  upsertMemoAtNote,
} from './note'
import { addRound, editRound, removeRound } from './round'
import { createTraining, removeTraining } from './training'

export const Mutation = {
  addExerciseByPart,
  renameExercise,
  deleteExercise,
  addRound,
  editRound,
  removeRound,
  createTraining,
  removeTraining,
  createNote,
  deleteNote,
  upsertMemoAtNote,
  deleteMemoAtNote,
  deleteMemo,
}
