import React from 'react'
import { render } from '@testing-library/react'
import { PrivateRoute } from './private-route.'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'

type SutTypes = {
  history: MemoryHistory
}
const makeSut = (): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/']
  })
  render(<Router location='/' navigator={history}>
   <Routes>
   <Route path='/' element={<PrivateRoute/>}>
          <Route path='/' element={<div></div>}/>
        </Route>
   </Routes>
  </Router>)
  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
