

import React, {useEffect, useRef, useState} from 'react';

import { ReactComponent as CompassZeroLayer} from './assets/Compass_0Layer.svg'

import { ReactComponent as CompassOneLayer} from './assets/Compass_1Layer.svg'

import { ReactComponent as CompassTwoLayer} from './assets/Compass_2Layer.svg'

import { ReactComponent as CompassTopLayer} from './assets/Compass_TopLayer.svg'

import { Settings } from './Settings';

import styles from './css/CompassRose.module.css'

const CompassRose = () => {


  const compassElement = useRef(null);

  // const oneLayerWrapElement = useRef(null);

  // const twoLayerWrapElement = useRef(null)

  const topLayerElement = useRef(null)

  const [compassHover, setCompassHover] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    topLayerElement.current.style.transform = compassHover ?  '' : 'rotate(0deg)'
    compassElement.current.style.animationPlayState = compassHover ?  'running' : 'paused'
  }, [compassHover])

  return (
    <>
    <div
    ref={compassElement}
    id={styles.compassHolder}
    className={styles.compass}
    onMouseEnter={() => setCompassHover(true)}
    onMouseLeave={() => setCompassHover(false)}
    >
      <CompassTopLayer ref={topLayerElement} className={`${styles.topLayer} ${styles.compass}`} />
      <CompassTwoLayer className={`${styles.twoLayer} ${styles.compass}`} />
      <CompassOneLayer className={`${styles.oneLayer} ${styles.compass}`} />
      <CompassZeroLayer className={`${styles.zeroLayer} ${styles.compass}`} />
      <div className={`${styles.compass} ${styles.menu} ${menuOpen ? styles.menuOpen : null}`}
      onMouseDown={() => setMenuOpen(true)}>
      {menuOpen ? <Settings /> : null}
      </div>
    </div>
    </>
)
}






export default CompassRose

