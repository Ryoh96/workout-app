import { render, screen } from '@testing-library/react'

import { unitOptions } from '@/constants'

import SelectBoxWithLabel from '.'

describe('SelectBoxWithLabel', () => {
  test('should display initial state', () => {
    const label = 'label'
    render(<SelectBoxWithLabel options={unitOptions} label={label} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.queryByText(label)).not.toHaveClass('sr-only')
  })

  test('should not display label', () => {
    const label = 'label'
    render(
      <SelectBoxWithLabel
        options={unitOptions}
        label={label}
        labelVisible={false}
      />
    )
    expect(screen.queryByText(label)).toHaveClass('sr-only')
  })
})
