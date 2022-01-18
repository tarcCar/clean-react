import { SurveyList } from '@/presentation/pages';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { makeLogin } from '../factories/pages/login/login-factory';
import { makeSignUp } from '../factories/pages/signup/signup-factory';

const Router: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin(props)} />
        <Route path='/signup' element={makeSignUp(props)} />
        <Route path='/' element={<SurveyList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
