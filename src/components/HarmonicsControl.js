import React from "react";


import { ReactComponent as Increment} from './assets/Increment.svg'

import {ReactComponent as Empty} from './assets/Empty.svg'

import { ReactComponent as Decrement} from './assets/Decrement.svg'

import styles from './css/HarmonicsControl.module.css'

export const HarmonicsController = () => {

  return (
    <>
    <div id={styles.container} >
    <Increment id={styles.increment}/>
    <Empty className={styles.empty} />
    <Decrement className={styles.decrement}/>
    </div>
    </>



  )

}
