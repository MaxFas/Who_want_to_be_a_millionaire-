import {Dispatch} from "redux";
import {appAPI} from "../components/api/appAPI";

const initialState = {
  questionsData: []
} as GameData

export const appReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'app/set-questions': {
      return {...state, questionsData: action.questionsData}
    }
    default: return state
  }
}

const setQuestions = (questionsData: Array<QuestionType>) =>
  ({type: 'app/set-questions', questionsData}) as const

export const setQuestionsTC = (amountQuestions:string) => (dispatch: Dispatch) => {
      appAPI.getQuestions(amountQuestions)
        .then(res=> {
          dispatch(setQuestions(res.data.results))
        })
        .catch((error)=>console.log(error))
}


export type GameData = {
  questionsData: Array<QuestionType>
}

export type QuestionType = {
  question: string
  correct_answer: string
  incorrect_answers: Array<string>
}

type ActionType = ReturnType<typeof setQuestions>