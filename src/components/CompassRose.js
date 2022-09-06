

import React, {useEffect, useRef, useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setDistance } from '../store/features/compass';

import { ReactComponent as CompassZeroLayer} from './assets/Compass_0Layer.svg'

import { ReactComponent as CompassOneLayer} from './assets/Compass_1Layer.svg'

import { ReactComponent as CompassTwoLayer} from './assets/Compass_2Layer.svg'

import { ReactComponent as CompassTopLayer} from './assets/Compass_TopLayer.svg'

import styles from './css/CompassRose.module.css'

const CompassRose = () => {

  const compassElement = useRef(null);

  const [compassHover, setCompassHover] = useState(false);

  const [mouseInfo, setMouseInfo] = useState({})

  const distance = useSelector((state) => state.compassInfo.distance)

  const dispatch = useDispatch();

  const animationStyle = {
    animationPlayState: compassHover ? 'running' : 'running',
  }

  const getMouseInfo = () => {
    let computedStyle = getComputedStyle(compassElement.current)
    let w = computedStyle.getPropertyValue("width").slice(0, -2)
    let h = computedStyle.getPropertyValue("height").slice(0, -2)
    let x = window.innerWidth
            - computedStyle.getPropertyValue("bottom").slice(0, -2)
            + (w / 2)
    let y = window.innerHeight
            - computedStyle.getPropertyValue("right").slice(0, -2)
            + (h / 2)
    setMouseInfo({x, y})
  }

  const getMouseDistance = (e) => {
    getMouseInfo()
    dispatch(setDistance({e, mouseInfo}))
  }

  document.addEventListener('mousemove', getMouseDistance);

  useEffect(() => {

  }, [distance])




  return (
    <>
    <div
    ref={compassElement}
    id={styles.compassHolder}
    className={styles.compass}
    onMouseEnter={() => setCompassHover(true)}
    onMouseLeave={() => setCompassHover(false)}
    style={animationStyle}
    >
      <CompassTopLayer className={`${styles.topLayer} ${styles.compass}`} />
      <CompassTwoLayer className={`${styles.twoLayer} ${styles.compass}`}
      />
      <CompassOneLayer className={`${styles.oneLayer} ${styles.compass}`}/>
      <CompassZeroLayer className={`${styles.zeroLayer} ${styles.compass}`} />
    </div>
    </>
)
}






export default CompassRose

