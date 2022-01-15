import React, { useEffect, useState } from 'react';
import Styles from './login-styles.scss';
import { LoginHeader as Header, Footer, FormStatus, Input, SubmitButton } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  validation?: Validation
  authentication?: Authentication
  saveAccessToken?: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication , saveAccessToken }: Props) => {
  const history = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const emailError = validation.validate('name', state.email)
    const passwordError = validation.validate('name', state.password)
    const isFormInvalid = !!(emailError || passwordError)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid
    })
  }, [state.email, state.password])

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
      const account = await authentication.auth({ email: state.email, password: state.password })
      await saveAccessToken.save(account.accessToken)

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

  return <div className={Styles.login}>
    <Header />
    <Context.Provider value={{ state, setState }} >
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail'/>
        <Input type='password' name='password' placeholder='Digite sua senha'/>
        <SubmitButton text='Entrar'/>
        <Link data-testid="singup-link" replace to="/singup" className={Styles.link}>Criar conta</Link>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>;
}

export default Login;
