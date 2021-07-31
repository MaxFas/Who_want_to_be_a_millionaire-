import axios from "axios";

export const appAPI = {
  getQuestions(amountQuestions: string) {
    return axios(`https://opentdb.com/api.php?amount=${amountQuestions}`)
  }
}
