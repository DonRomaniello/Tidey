import React from "react";

import { HarmonicsController } from "./HarmonicsControl";

import { ReactComponent as Credits} from './assets/Credits.svg'

import {ReactComponent as Questions} from './assets/Questions.svg'

import styles from './css/Settings.module.css'

export const Settings = () => {

  return (
    <>
    <div id={styles.settings} >
    <HarmonicsController className={styles.controller} />
    <Questions className={styles.icons}/>
    <Credits className={styles.icons}/>
    <div className={styles.empty} />
    </div>
    </>



  )

}
