const recoilKeys = [
  'noteId',
  'noteData',
  'currentDate',
  'editRoundModal',
  'deleteRoundModal',
  'deleteTrainingModal',
  'editRound',
  'deleteRoundId',
  'deleteTrainingId',
  'editedTrainingId',
  'lastTrainingId',
  'isEditing',
] as const

export const recoilKeyHashSet = Object.fromEntries(
  recoilKeys.map((k) => [k, k])
) as {
  [k in (typeof recoilKeys)[number]]: k
}

const set = new Set(recoilKeys)
if (set.size !== recoilKeys.length) {
  throw Error('recoilKeyが重複しています')
}
