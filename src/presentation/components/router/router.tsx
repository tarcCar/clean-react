import { SingUp } from '@/presentation/pages';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin, ...props }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={makeLogin(props)} />
        <Route path='/signup' element={<SingUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
