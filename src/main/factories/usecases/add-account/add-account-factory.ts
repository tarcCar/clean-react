import { RemoteAddAccount } from '@/data/usescases/add-account/remote-add-account';
import { AddAccount } from '@/domain/usecases';
import { makeApiUrl } from '@/main/factories/http/api-url-factoty';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
