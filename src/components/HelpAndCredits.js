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
      <p>The vertical location of the <span className={styles.red}>red dots</span> aligns with the rising and falling tide.</p>
      <p>The speed at which the circles rotate is how quickly that influence, or constituent, ebbs and flows.</p>
      <h2>Constituents</h2>
      <p>Circles, which represent tidal constituents, can be added or removed using the controls at the top of the expanded Compass Rose Menu.</p>
      <p>The ultimate sources of the constituents are the Moon and the Sun, which create regular tidal pulses.</p>
      <p>These pulses then reflect and interact with the shore and underwater geography.</p>
      <p>From those two ultimate sources, dozens of pulses of varying intensities and tempos are created.</p>
      <h2>Caveats</h2>
      <p>Tidey is a greatly simplified representation of the actual calculations required to predict the tides.</p>
      <p>Do not try to use Tidey to make any sort of predictions or plans.</p>
      <h2>Credits</h2>
      <p>Tidey is the work of Don Romaniello.</p>
      <p>The code for Tidey can be found here.</p>
      <p>The underlying map data comes from <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, used according to a <a href="http://creativecommons.org/licenses/by-sa/3.0" target="_blank">CC BY SA</a> license.</p>
      <p> The watercolor rendition of the map is by  <a href="http://stamen.com" target="_blank">Stamen Design</a>, released under a <a href="http://creativecommons.org/licenses/by/3.0" target="_blank">CC BY 3.0</a> license.</p>
      <p>The Compass Rose is derived from <a href="https://commons.wikimedia.org/wiki/File:WInd_Rose_Aguiar.png" target="_blank">this source</a>, converted to SVG by <a href="https://commons.wikimedia.org/wiki/User:Alvesgaspar" target="_blank">Alvesgaspar</a> and released under a <a href="http://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CC BY-SA 3.0</a> license via Wikimedia Commons.</p>
      <p>The harmonic constituent method of calculating the tides was independently determined by <a href="http://www.ccpo.odu.edu/~klinck/Reprints/PDF/foremanAvWR1989.pdf" target="_blank">William Ferrel and Lord Kelvin.</a></p>
      <p>Tide station data, in the form of harmonic constituents, is provided by relevant agencies in various states with funding from taxpayers.</p>
      <p>All station data used in this project is the public domain.</p>
      <p>For useable tide predictions, observations, and more information, try <a href="https://tidesandcurrents.noaa.gov/map/index.html?type=TidePredictions" target="_blank">this NOAA resource.</a></p>
      </div>
    </div>
    </>
  )
}
