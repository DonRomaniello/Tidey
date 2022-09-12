import React, {useS} from "react";

import { useDispatch } from 'react-redux';

import { increment, decrement } from '../store/features/harmonics'

import styles from './css/HarmonicsControl.module.css'

export const HarmonicsController = () => {

  const dispatch = useDispatch()

  return (
    <>
    <div id={styles.container} >
    <div id={styles.empty} />
    <div id={styles.increment}
    onClick={() => dispatch(increment())}
    />
    <div id={styles.decrement}
    onClick={() => dispatch(decrement())}/>
    </div>
    </>



  )

}
