import React from "react";

import { useDispatch } from 'react-redux';

import { toggleHelp } from "../store/features/help";

import { HarmonicsController } from "./HarmonicsControl";

import { ReactComponent as Credits} from './assets/Credits.svg'

import {ReactComponent as Questions} from './assets/Questions.svg'

import styles from './css/Settings.module.css'

export const Settings = () => {

  const dispatch = useDispatch();

  return (
    <>
    <div id={styles.settings} >
      <HarmonicsController className={styles.controller} />
    <div id={styles.info}
    onClick={() => dispatch(toggleHelp())}
    >
      <Credits className={styles.icons} />
      <Questions className={styles.icons}/>
    </div>
      <div className={styles.empty} />
    </div>
    </>



  )

}
