import React, {useState} from "react";
import styles from "./preview.module.css"
import {useDispatch} from "react-redux";
import {setQuestionsTC} from "../../reducers/appReducer";

type PreviewPropsType = {
  setStartGame: (isStart: boolean) => void
}

export const Preview = (props: PreviewPropsType) => {

  const dispatch = useDispatch()
  const [amountQuestions, setAmountQuestions] = useState<string>('0')
  const [zeroQuestions, setZeroQuestions] = useState<boolean>(false)

  const SelectAmountQuestions = (amountQuestions: string) => {
    if (amountQuestions === '0') {
      setZeroQuestions(true)
    } else {
      dispatch(setQuestionsTC(amountQuestions))
      props.setStartGame(true)
    }
  }

  return (
    <div className={styles.container}>
      <p>Hello, this is the game:</p>
      <h1>Who wants to be a millionaire!</h1>
      <p>How many questions should you ask?</p>
      <div className={styles.functionalPanel}>
        <input className={styles.input} value={amountQuestions}
               onChange={(e) => setAmountQuestions(e.currentTarget.value)}
               onKeyPress={(e) => {
                 if (e.key === 'Enter') {
                   SelectAmountQuestions(amountQuestions)
                 }
               }} type="text"/>
        <button className={styles.button}
                onClick={() => {
                  SelectAmountQuestions(amountQuestions)
                }}>OK
        </button>
        {!zeroQuestions || <div className={styles.zero}>Please, enter the count of questions</div>}
      </div>
    </div>
  )
}
