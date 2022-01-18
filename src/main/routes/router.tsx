import React from 'react';
import { SurveyList } from '@/presentation/pages';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeLogin } from '../factories/pages/login/login-factory';
import { makeSignUp } from '../factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/contexts';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter';

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
          <Route path='/' element={<SurveyList/>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router;
