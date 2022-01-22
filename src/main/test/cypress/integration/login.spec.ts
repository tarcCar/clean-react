import faker from 'faker'
import { testInputStatus, testMainError } from '../support/form-helper'
import { testHttpCallsCount, testUrl, testLocalStorageItem } from '../support/helpers'
import { mockInvalidCredentialsError, mockUnexpectedError, mockOk } from '../support/login-mocks'

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email')
      .should('have.attr', 'readonly')
    testInputStatus('email','Campo obrigatório')

    cy.getByTestId('password')
      .should('have.attr', 'readonly')
    testInputStatus('password','Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email','campo inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password','campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present erro if invalid credentials are provided', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    testMainError('Credenciais Inválidas')
    testUrl('/login')
  })

  it('Should present erro if request returns Unexpected Error', () => {
    mockUnexpectedError()
    simulateValidSubmit()

    testMainError('Algo de errado aconteceu. tente novamente')
    testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()

    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')

    testUrl('/')
    testLocalStorageItem('account')
  })

  it('Should prevent multiple submit', () => {
    mockOk()
    populateFields()
    cy.getByTestId('submit').dblclick()
    testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    testHttpCallsCount(0)
  })
})
