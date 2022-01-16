import { testInputStatus } from '../support/form-helper'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name')
      .should('have.attr', 'readonly')
    testInputStatus('name','Campo obrigatório')

    cy.getByTestId('email')
      .should('have.attr', 'readonly')
    testInputStatus('email','Campo obrigatório')

    cy.getByTestId('password')
      .should('have.attr', 'readonly')
    testInputStatus('password','Campo obrigatório')

    cy.getByTestId('passwordConfirmation')
      .should('have.attr', 'readonly')
    testInputStatus('passwordConfirmation','Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
