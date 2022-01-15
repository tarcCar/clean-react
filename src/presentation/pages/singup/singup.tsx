import React, { useEffect, useState } from 'react';
import Styles from './singup-styles.scss';
import { LoginHeader as Header, Footer, FormStatus, Input } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/usecases';

type Props = {
  validation?: Validation
  addAccount?: AddAccount
}

const SingUp: React.FC<Props> = ({ validation, addAccount }) => {
  const [state, setState] = useState({
    isLoading: false,
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
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('name', state.email),
      passwordError: validation.validate('name', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation),
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading ||
      state.nameError ||
      state.emailError ||
      state.passwordError ||
      state.passwordConfirmationError
    ) {
      return
    }
    setState({
      ...state,
      isLoading: true
    })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    })
  }

  return <div className={Styles.singup}>
    <Header />
    <Context.Provider value={{ state, setState }} >
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type='text' name='name' placeholder='Digite seu nome'/>
        <Input type='email' name='email' placeholder='Digite seu e-mail'/>
        <Input type='password' name='password' placeholder='Digite sua senha'/>
        <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha'/>
        <button data-testid="submit" disabled={!!(state.emailError || state.passwordError || state.nameError || state.passwordConfirmationError)} className={Styles.submit} type='submit'>Salvar</button>
        <span className={Styles.link}>Voltar para login</span>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>;
}

export default SingUp;
