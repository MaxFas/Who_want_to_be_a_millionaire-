import React, {useState} from 'react';
import {Preview} from "../preview/Preview";
import styles from "./app.module.css"
import {Main} from "../main/Main";
import back from './../../common/imges/back.jpg'



function App() {
  const backImg = {
    backgroundImage:`url(${back})`
  }

  const [startGame, setStartGame] = useState<boolean>(false)

  return (
    <div className={styles.body} style={backImg}>
      {startGame?
        <Main setStartGame={setStartGame}/>:
        <Preview setStartGame={setStartGame}/>}
    </div>
  );
}
export default App;
