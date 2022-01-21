import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClientSpy: HttpGetClient<RemoteLoadSurveyList.Model[]>) {}

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClientSpy.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model
}
