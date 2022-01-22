import faker from 'faker'
import { getLocalStorageItem, setLocalStorageItem, testUrl } from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
export const mockSuccess = (): void => Http.mockOk(path, 'GET', 'survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      setLocalStorageItem('account', account)
    })
  })

  it('Should present erro on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('Should reload on error button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    testUrl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logoutLink click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    testUrl('/login')
  })

  it('Should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '15')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="month"]').text(), 'mar')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')
      assert.equal(li.find('[data-testid="year"]').text(), '2021')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
