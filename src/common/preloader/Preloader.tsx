import preloader from "./../imges/preloader.gif";
import React from "react";
import styles from './preloader.module.css'

export function Preloader () {
  return (
    <div className={styles.preloader}>
      <img src={preloader} alt=""/>
    </div>
  )
}