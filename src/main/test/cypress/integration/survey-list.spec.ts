import faker from 'faker'
import { setLocalStorageItem, testUrl } from '../support/helpers'
import { mockAccessDeniedError, mockUnexpectedError } from '../support/survey-list-mocks'

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

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    testUrl('/login')
  })
})
