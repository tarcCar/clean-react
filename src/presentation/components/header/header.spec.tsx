import { ApiContext } from '@/presentation/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Header } from '..'
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory()
  const setCurrentAccountMock = jest.fn()
  render(<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
     <Router location='/' navigator={history}>
      <Header />
     </Router>
    </ApiContext.Provider>)
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  const { history, setCurrentAccountMock } = makeSut()
  test('Should call setCurrentAccount with null', () => {
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
