import React, { useContext, useEffect, useState } from 'react';
import { Footer, Header, } from '@/presentation/components';
import Styles from './survey-list-styles.scss'
import { SurveyContext, SurveyListItem, Error } from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import { useErrorHandler } from '@/presentation/hooks';

type Props = {
  loadSurveyList?: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const errorHandler = useErrorHandler((error: Error) => setState({ ...state, error: error.message }))
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(errorHandler)
  },[state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? <Error />
            : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList;
