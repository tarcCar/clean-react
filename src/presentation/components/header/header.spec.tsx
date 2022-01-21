import { ApiContext } from '@/presentation/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Header } from '..'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const history = createMemoryHistory()
    const setCurrentAccountMock = jest.fn()
    render(<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
       <Router location='/' navigator={history}>
        <Header />
       </Router>
      </ApiContext.Provider>)
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
