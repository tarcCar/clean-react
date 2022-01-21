import { RemoteLoadSurveyList } from '../usescases/load-survey-list/remote-load-survey-list'
import faker from 'faker'

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
])

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => (
  {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent().toISOString()
  }
)
