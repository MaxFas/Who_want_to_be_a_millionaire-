//@ts-ignore
import audio from "./../../common/audio/winAudio.mp3"
//@ts-ignore
import audio_1 from "./../../common/audio/lose.mp3"
import React, {useState} from "react";
import styles from "./main.module.css"
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../store/store";
import {clearPreviousData, QuestionType} from "../../reducers/appReducer";
import {Preloader} from "../../common/preloader/Preloader";
import {ResultFalse} from "../result/ResultFalse";

type MainPropsType = {
  setStartGame: (isStart: boolean) => void
}

export const Main = (props: MainPropsType) => {
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(true)
  const [win, setWin] = useState<boolean>(false)
  const dispatch = useDispatch()
  let currentAnswers = []

  const winAudio = new Audio(audio)
  const loseAudio = new Audio(audio_1)

  //Получение вопросов
  const questionsData = useSelector<RootStateType, Array<QuestionType>>
  ((state) => state.app.questionsData)
  const questions = questionsData.map(data => data.question)
  //Получение ответов и логика по их случайному расположению
  const answers = questionsData.map(data => {
    const numb = Math.random()
    // В данном API ответы могут приходить в форме false/true (2 варианта ответа)
    if(data.incorrect_answers.length === 1|| numb>0.5) {
      return [...data.incorrect_answers, data.correct_answer]
    } else if(data.incorrect_answers.length === 1|| numb<0.5) {
      return [data.correct_answer, ...data.incorrect_answers]}
      //Обработка ответов, если приходит 4 варианта ответа
      else {
      if (numb > 0.75) {
        return [data.correct_answer, ...data.incorrect_answers]
      } else if (numb > 0.50) {
        const commonArr = [data.correct_answer, ...data.incorrect_answers]
        const temp = commonArr[0]
        commonArr[0] = commonArr[2]
        commonArr[2] = temp
        return commonArr
      } else if (numb > 0.25) {
        const commonArr = [data.correct_answer, ...data.incorrect_answers]
        const temp = commonArr[0]
        commonArr[0] = commonArr[3]
        commonArr[3] = temp
        return commonArr
      } else {
        return [...data.incorrect_answers, data.correct_answer]
      }
    }
  })

  //Отрисовка варианов ответа и обработка кликов
  if (answers.length !== 0) {
    currentAnswers = answers[questionNumber].map((a, i) =>
      <div key={i} onClick={(e) => {
        onAnswerClick(a)
      }} className={styles.variantAnswer}>{a}</div>)
  } else currentAnswers = [<div/>]
  const onAnswerClick = (answer: string) => {
    if (answer === questionsData[questionNumber].correct_answer) {
      setCorrectAnswer(true)
      if (answers.length === questionNumber + 1) {
        setWin(true)
        winAudio.play()
      } else setQuestionNumber(questionNumber + 1)
    } else {
      setCorrectAnswer(false)
      loseAudio.play()
    }
  }


  if (!questionsData.length) return <Preloader/>
  return (
    <div className={styles.container}>
      {!win || <div><div className={styles.win}>YOU WIN</div>
          <div className={styles.again}>
              <button className={styles.againButton} onClick={
                ()=> {
                  props.setStartGame(false)
                  dispatch(clearPreviousData())
                }}>NEW GAME</button>
          </div></div>}
      {correctAnswer ? '' :
        <ResultFalse setCorrectAnswer={setCorrectAnswer} setStartGame={props.setStartGame}/>}
      <div className={styles.question}>{questions[questionNumber]}</div>
      <div className={styles.AnswersBlock}>
        {currentAnswers}
      </div>
    </div>
  )
}
