import React, { useState } from 'react';
import Styles from './singup-styles.scss';
import { LoginHeader as Header, Footer, FormStatus, Input } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'

const SingUp: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return <div className={Styles.singup}>
    <Header />
    <Context.Provider value={{ state }} >
      <form className={Styles.form} >
        <h2>Criar Conta</h2>
        <Input type='text' name='name' placeholder='Digite seu nome'/>
        <Input type='email' name='email' placeholder='Digite seu e-mail'/>
        <Input type='password' name='password' placeholder='Digite sua senha'/>
        <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha'/>
        <button data-testid="submit" disabled className={Styles.submit} type='submit'>Salvar</button>
        <span className={Styles.link}>Voltar para login</span>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>;
}

export default SingUp;
