
import React, { useState, useEffect } from 'react';

import {
  CircleMarker,
  Polyline,
} from 'react-leaflet'

const axios =  require("axios");

// require('dotenv').config();

const Station = (props) => {

const { stationInfo } = props

const [predictions, setPredictions] = useState([])

const [linePosition, setLinePosition] = useState([]);

const position = [stationInfo?.lat, stationInfo?.lng]

// const overlayStyle = {
//   opacity: '.25',
//   transform: 'rotate3d(1, 0, 0, 45deg)',
// }

const circleRadius = 10

const urlWithArguments = () => {

    let args = [
      {datum: 'MSL'},
      {format: 'json'},
      {interval: 'h'},
      {product: 'water_level'},
      {range: '24'},
      { station: '8454000'},
      {time_zone: 'lst'},
      {units: 'english'},
    ]

    let returnURl =  'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter'
                       + args.map((argument) => '&'
                                  + Object.keys(argument)[0]
                                  + '='
                                  + argument[Object.keys(argument)[0]])
                                  .join('')
    return returnURl
}

// useEffect(() => {

//   const fetchTide = async () => {
//     const waterLevels = await axios.get(urlWithArguments(),
//      { headers: {
//       token: process.env.noaaToken,
//     }}
//     ).catch((error) => {
//       console.log(error)
//     })



//     setPredictions(waterLevels);
//   }

//   fetchTide();

// }, [])

// useEffect(() => {
//   setLinePosition([
//     position,
//     [ stationInfo.lon + Number(predictions[0]?.v),
//     position[1]]
//   ])

// }, [predictions, position])




  return (
    <>
       <CircleMarker center={position} pathOptions={stationMarker} radius={3} />
       {/* <Polyline pathOptions={waterLevelMarker} positions={linePosition} /> */}
    </>
)
}

const stationMarker = { color: 'white', opacity: '.8' }

const waterLevelMarker = { color: 'green' }

export default Station





