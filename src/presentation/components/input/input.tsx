import React, { useContext, useRef } from 'react';
import Styles from './input-styles.scss';
import Context from '@/presentation/contexts/form/form-context'
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  return <div
    className={Styles.inputWrap}
    data-testid={`${props.name}-wrap`}
    data-status={error ? 'invalid' : 'valid'}
  >
    <input
      {...props}
      title={error}
      ref={inputRef}
      data-testid={props.name}
      placeholder=' '
      readOnly
      onFocus={(e) => { e.target.readOnly = false }}
      onChange={(e) => { setState({ ...state, [e.target.name]: e.target.value }) }}
    />
    <label
      data-testid={`${props.name}-label`}
      title={error}
      onClick={() => inputRef.current.focus()}
     >
      {props.placeholder}
    </label>
  </div>
}

export default Input;
