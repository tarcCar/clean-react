import { AccessDeniedError } from '@/domain/errors'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '../contexts'
import error from '../pages/survey-list/components/error/error'

type CallbackType = (error: Error) => void
type ResultType = CallbackType
export const useErrorHandler = (callback: CallbackType): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login', {
        replace: true
      })
    } else {
      callback(error)
    }
  }
}
