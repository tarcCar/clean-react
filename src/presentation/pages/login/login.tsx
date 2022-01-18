import React, { useContext, useEffect, useState } from 'react';
import Styles from './login-styles.scss';
import { LoginHeader as Header, Footer, FormStatus, Input, SubmitButton } from '@/presentation/components';
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
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

  return <div className={Styles.loginWrap}>
    <Header />
    <FormContext.Provider value={{ state, setState }} >
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail'/>
        <Input type='password' name='password' placeholder='Digite sua senha'/>
        <SubmitButton text='Entrar'/>
        <Link data-testid="signup-link" replace to="/signup" className={Styles.link}>Criar conta</Link>
        <FormStatus />
      </form>
    </FormContext.Provider>
    <Footer />
  </div>;
}

export default Login;
