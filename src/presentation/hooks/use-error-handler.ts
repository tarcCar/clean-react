import { AccessDeniedError } from '@/domain/errors'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '.'
import { ApiContext } from '../contexts'

type CallbackType = (error: Error) => void
type ResultType = CallbackType
export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
