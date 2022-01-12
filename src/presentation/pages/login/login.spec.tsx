import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import faker from 'faker'
import { ValidationSpy } from '@/presentation/test'

type SutTypes ={
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const errorMessage = faker.random.words()
  validationSpy.errorMessage = errorMessage
  const sut = render(<Login validation={validationSpy}/>)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut()
    const { getByTestId } = sut
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const { getByTestId } = sut
    const emailInput = getByTestId('email')

    const email = faker.internet.email()
    fireEvent.input(emailInput, {
      target: {
        value: email
      }
    })

    expect(validationSpy.fieldName).toEqual(
      'email'
    )
    expect(validationSpy.fieldValue).toEqual(
      email
    )
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const { getByTestId } = sut
    const passwordInput = getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, {
      target: {
        value: password
      }
    })

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const { getByTestId } = sut
    const emailInput = getByTestId('email')

    fireEvent.input(emailInput, {
      target: {
        value: faker.internet.email()
      }
    })

    const emailStatus = getByTestId('email-status')

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
