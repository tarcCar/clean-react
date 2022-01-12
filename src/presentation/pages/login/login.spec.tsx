import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { ValidationStub } from '@/presentation/test'

type SutTypes ={
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const errorMessage = faker.random.words()
  validationStub.errorMessage = errorMessage
  const sut = render(<Login validation={validationStub}/>)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    const { getByTestId } = sut
    const emailInput = getByTestId('email')

    fireEvent.input(emailInput, {
      target: {
        value: faker.internet.email()
      }
    })

    const emailStatus = getByTestId('email-status')

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state if validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const { getByTestId } = sut
    const passwordInput = getByTestId('password')

    fireEvent.input(passwordInput, {
      target: {
        value: faker.internet.password()
      }
    })

    const passwordStatus = getByTestId('password-status')

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
