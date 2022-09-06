

import React, {useEffect, useRef, useState} from 'react';


import { ReactComponent as CompassZeroLayer} from './assets/Compass_0Layer.svg'

import { ReactComponent as CompassOneLayer} from './assets/Compass_1Layer.svg'

import { ReactComponent as CompassTwoLayer} from './assets/Compass_2Layer.svg'

import { ReactComponent as CompassTopLayer} from './assets/Compass_TopLayer.svg'

import styles from './css/CompassRose.module.css'

const CompassRose = () => {

  const compassElement = useRef(null);

  const [compassHover, setCompassHover] = useState(false);

  const [mouseProximity, setMouseProximity] = useState()

  const [compassInfo, setCompassInfo] = useState({})

  const animationStyle = {
    animationPlayState: compassHover ? 'running' : 'running',
  }

  const getCompassInfo = () => {
    let computedStyle = getComputedStyle(compassElement.current)
    let w = computedStyle.getPropertyValue("width").slice(0, -2)
    let h = computedStyle.getPropertyValue("height").slice(0, -2)
    let x = window.innerWidth
            - computedStyle.getPropertyValue("bottom").slice(0, -2)
            + (w / 2)
    let y = window.innerHeight
            - computedStyle.getPropertyValue("right").slice(0, -2)
            + (h / 2)
    return {x, y, w, h}
  }

  useEffect(() => {
    setCompassInfo(getCompassInfo())
  }, [])

  const getMouseDistance = (e) => {

    setCompassInfo(getCompassInfo())


      let distanceTo = Math.sqrt(
        Math.pow((compassInfo.x - e.x),2)
        + Math.pow((compassInfo.y - e.y),2))

        if (distanceTo) {
          console.log(compassInfo)
          console.log(distanceTo)
        }



  }

  document.addEventListener('mousemove', getMouseDistance);


  // console.log(here.MouseEvent.clientX)

  const autoPanPad = {
    x: (window.innerWidth - 500) / 2,
    y: (window.innerHeight - 300) / 2,
 }

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

