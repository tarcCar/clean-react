import React from 'react'
import { render } from '@testing-library/react'
import { PrivateRoute } from './private-route.'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}
const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/']
  })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router location='/' navigator={history}>
        <Routes>
            <Route path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<div></div>}/>
            </Route>
        </Routes>
     </Router>
    </ApiContext.Provider>
  )
  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render current component if token not is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
