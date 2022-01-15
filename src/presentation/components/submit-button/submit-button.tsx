import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
}

const SignUp: React.FC<Props> = ({ text }) => {
  const { state } = useContext(Context)

  return <button data-testid="submit" disabled={state.isFormInvalid} type='submit'>
    {text}
  </button>
}

export default SignUp;
