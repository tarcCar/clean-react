import React, { useContext, useEffect, useState } from 'react';
import Styles from './signup-styles.scss';
import { LoginHeader as Header, Footer, FormStatus, Input, SubmitButton } from '@/presentation/components';
import { FormContext, ApiContext } from '@/presentation/contexts'

import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/usecases';
import { useNavigate , Link } from 'react-router-dom';

type Props = {
  validation?: Validation
  addAccount?: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)
    const isFormInvalid = !!(nameError || emailError || passwordError || passwordConfirmationError)
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      })

      setCurrentAccount(account)

      history('/', {
        replace: true
      })
    } catch (error) {
      setState({
        ...state,
        mainError: error.message
      })
    }
  }

  return <div className={Styles.signUpWrap}>
    <Header />
    <FormContext.Provider value={{ state, setState }} >
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type='text' name='name' placeholder='Digite seu nome'/>
        <Input type='email' name='email' placeholder='Digite seu e-mail'/>
        <Input type='password' name='password' placeholder='Digite sua senha'/>
        <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha'/>
        <SubmitButton text='Cadastrar'/>
        <Link data-testid="login-link" replace to="/login" className={Styles.link}>Voltar para login</Link>
        <FormStatus />
      </form>
    </FormContext.Provider>
    <Footer />
  </div>;
}

export default SignUp;
