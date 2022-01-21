import { RemoteLoadSurveyList } from '@/data/usescases/load-survey-list/remote-load-survey-list';
import { LoadSurveyList } from '@/domain/usecases';
import { makeApiUrl } from '@/main/factories/http/api-url-factoty';
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}
