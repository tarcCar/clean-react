import { testUrl } from '../support/helpers'

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
