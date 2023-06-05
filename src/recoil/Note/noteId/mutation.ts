import { setRecoil } from 'recoil-nexus'

import { noteIdState } from './states'

export const NoteIdMutation = {
  set: (value: string) => setRecoil(noteIdState, value),
}
