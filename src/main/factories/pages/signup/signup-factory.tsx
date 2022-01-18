import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from './signup-validation-factory';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/add-account-factory';

export const makeSignUp: React.FC = () => {
  return (<SignUp
    addAccount={makeRemoteAddAccount()}
    validation={makeSignUpValidation()}
  />)
}
