import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import ExerciseFooter from '.'

describe('ExerciseFooter component', () => {
  it('should scroll to the correct section when a button is clicked', () => {
    const dataRef = { current: { scrollIntoView: jest.fn() } }
    const graphRef = { current: { scrollIntoView: jest.fn() } }
    const memoRef = { current: { scrollIntoView: jest.fn() } }
    const noteRef = { current: { scrollIntoView: jest.fn() } }
    const { getByText } = render(
      <ExerciseFooter
        // @ts-ignore
        dataRef={dataRef}
        // @ts-ignore
        graphRef={graphRef}
        // @ts-ignore
        memoRef={memoRef}
        // @ts-ignore
        noteRef={noteRef}
      />
    )

    fireEvent.click(getByText('データ'))
    expect(dataRef.current.scrollIntoView).toHaveBeenCalled()

    fireEvent.click(getByText('メモ'))
    expect(memoRef.current.scrollIntoView).toHaveBeenCalled()

    fireEvent.click(getByText('グラフ'))
    expect(graphRef.current.scrollIntoView).toHaveBeenCalled()

    fireEvent.click(getByText('ノート'))
    expect(noteRef.current.scrollIntoView).toHaveBeenCalled()
  })
})
