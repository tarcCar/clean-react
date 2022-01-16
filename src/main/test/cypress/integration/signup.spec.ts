import { testInputStatus } from '../support/form-helper'
import faker from 'faker'

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

  it('Should present error if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('name','campo inválido')

    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email','campo inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password','campo inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation','campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
