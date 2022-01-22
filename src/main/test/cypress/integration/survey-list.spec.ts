import faker from 'faker'
import { testInputStatus, testMainError } from '../support/form-helper'
import { setLocalStorageItem } from '../support/helpers'
import { mockUnexpectedError } from '../support/survey-list-mocks'

describe('SurveyList', () => {
  beforeEach(() => {
    setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName()
    })
  })

  it('Should present erro on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente')
  })
})
