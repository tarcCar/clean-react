import { SignUp } from '@/presentation/pages';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Props> = ({ makeLogin,makeSignUp, ...props }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin(props)} />
        <Route path='/signup' element={makeSignUp(props)} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
