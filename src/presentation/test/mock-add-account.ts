import { mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/usecases'

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()
export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params: AddAccount.Params
  callsCount = 0

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
