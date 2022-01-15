import { SingUp } from '@/presentation/pages';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
  makeSingUp: React.FC
}

const Router: React.FC<Props> = ({ makeLogin,makeSingUp, ...props }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin(props)} />
        <Route path='/signup' element={makeSingUp(props)} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
