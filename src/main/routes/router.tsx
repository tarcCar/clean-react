import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList } from '../factories/pages';
import { ApiContext } from '@/presentation/contexts';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter';
import { PrivateRoute } from '@/presentation/components';

const Router: React.FC = (props) => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={makeLogin(props)} />
          <Route path='/signup' element={makeSignUp(props)} />
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={makeSurveyList(props)}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router;
