import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClientSpy: HttpGetClient<SurveyModel[]>) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClientSpy.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default:
        throw new UnexpectedError()
    }
  }
}
