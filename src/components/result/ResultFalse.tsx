import React from "react";
import styles from "./resultFalse.module.css"

type ResultPropsType = {
  setStartGame: (isStart: boolean) => void
  setCorrectAnswer: (isCorrect: boolean) => void
}

export const ResultFalse = (props: ResultPropsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>You lost</h2>
        <div className={styles.functionalPanel}>Try again?
          <button onClick={() => {
            props.setStartGame(false)
            props.setCorrectAnswer(true)
          }}>OK</button>
        </div>
      </div>
    </div>
  )
}
