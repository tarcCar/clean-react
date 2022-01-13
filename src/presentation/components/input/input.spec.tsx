import React from 'react'

import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Input } from '..'
import Context from '@/presentation/contexts/form/form-context'
describe('Input Component', () => {
  test('Should begin with readonly', () => {
    const { getByTestId } = render(<Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>)
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
