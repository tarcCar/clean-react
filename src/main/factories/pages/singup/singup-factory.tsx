import React from 'react'
import { SingUp } from '@/presentation/pages'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';
import { makeSingUpValidation } from './singup-validation-factory';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/add-account-factory';

export const makeSingUp: React.FC = () => {
  return (<SingUp
    addAccount={makeRemoteAddAccount()}
    validation={makeSingUpValidation()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />)
}
