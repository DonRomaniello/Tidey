import React from "react";

import styles from './css/HelpAndCredits.module.css'

export const HelpAndCredits = () => {

  return (
    <>
    <div id={styles.helpContainer}>
      <div id={styles.helpContent}>
      <h1>Tidey</h1>
      <p>Tidey is art, a toy, in the form of a tool. Tidey visualizes how the Earth’s tides work.</p>
      <p>Each pin on the map is a station.</p>
      <p>For each pin, there is a tide chart.</p>
      <h2>Circles and Dots</h2>
      <p>The <span className={styles.blues}>rotating circles</span> correspond to the major influences on the tide for that location. The wider the circle, the more that circle affects the water level.</p>
      <p>The vertical location of the <span className={styles.red}>red dots</span> align with the rising and falling tide.</p>
      <p>The speed at which the circles rotate is how quickly that influence, or constituent, ebbs and flows.</p>
      <h2>Influences</h2>
      <p>Circles, or constituents, can be added or removed using the controls at the top of the expanded Compass Rose Menu.</p>
      <p>The ultimate sources of these influences are the Moon and the Sun, which create a regular tidal pulse. These pulses </p>
      </div>
    </div>
    </>
  )
}
