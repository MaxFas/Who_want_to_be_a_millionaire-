import React from "react";
import styles from "./resultFalse.module.css"
import {useDispatch} from "react-redux";
import {clearPreviousData} from "../../reducers/appReducer";

type ResultPropsType = {
  setStartGame: (isStart: boolean) => void
  setCorrectAnswer: (isCorrect: boolean) => void
}

export const ResultFalse = (props: ResultPropsType) => {

  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>You lost</h2>
        <div className={styles.functionalPanel}>Try again?
          <button onClick={() => {
            props.setStartGame(false)
            props.setCorrectAnswer(true)
            dispatch(clearPreviousData())
          }}>OK</button>
        </div>
      </div>
    </div>
  )
}
