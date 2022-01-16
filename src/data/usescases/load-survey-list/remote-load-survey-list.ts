import { HttpGetClient } from '@/data/protocols/http';

export class RemoteLoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClientSpy: HttpGetClient) {}

  async loadAll (): Promise<void> {
    await this.httpGetClientSpy.get({ url: this.url })
  }
}
