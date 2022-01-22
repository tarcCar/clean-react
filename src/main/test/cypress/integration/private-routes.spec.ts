import faker from 'faker'
import { testInputStatus, testMainError } from '../support/form-helper'
import { testHttpCallsCount, testUrl, testLocalStorageItem } from '../support/helpers'
import { mockInvalidCredentialsError, mockUnexpectedError, mockOk } from '../support/login-mocks'

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
