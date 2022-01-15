import React from 'react';
import Styles from './singup-styles.scss';
import { LoginHeader as Header, Footer, FormStatus, Input } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'

import { Link } from 'react-router-dom';

const SingUp: React.FC = () => {
  return <div className={Styles.singup}>
    <Header />
    <Context.Provider value={{ state: {} }} >
      <form className={Styles.form} >
        <h2>Criar Conta</h2>
        <Input type='text' name='name' placeholder='Digite seu nome'/>
        <Input type='email' name='email' placeholder='Digite seu e-mail'/>
        <Input type='password' name='password' placeholder='Digite sua senha'/>
        <Input type='password' name='password' placeholder='Confirme sua senha'/>
        <button className={Styles.submit} type='submit'>Salvar</button>
        <Link to="/login" className={Styles.link}>Voltar para login</Link>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>;
}

export default SingUp;
