const axios =  require("axios");

const fs = require('fs')

require('dotenv').config();

// Master list
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/


// https://www.ncdc.noaa.gov/cdo-web/webservices/v2

// Format
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/9455760.json?units=english


// /api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20220801&end_date=20220802&datum=MLLW&station=8518949&time_zone=lst_ldt&units=english&interval=hilo&format=json

// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredicitons

// url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

// url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/mode.json'

// let stationID = '8418150'

let url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=datums'

url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=harcon'

let stations =  []

axios.get(url)
    .then(response => stations = response.data.stations)
    .catch(error => console.log(error))
    // .finally(() => console.log(stations[0]))
    // .finally(() => stations.forEach((station) => fs.appendFileSync('./resources/stattions.txt', station.id + '\n')))
    .finally(() => whatIsTheRate())
// url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations?'



const urlWithArguments = (url, args) => {
  let returnURl =  url + args.map((argument) => Object.keys(argument)[0]
  + '='
  + argument[Object.keys(argument)[0]]
  + '&')
  .join('')
  .slice(0, -1)

  return returnURl
}

let stationIdx = 0;

let errorIds = []

const whatIsTheRate = () => {

// console.log(stations[stationIdx].id)

url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?'

let args = [
  { station: stations[stationIdx].id},
  // { station: 1612340},
  {interval: 'h'},
  {range: '24'},
  {product: 'predictions'},
  {datum: 'STND'},
  {units: 'english'},
  {time_zone: 'gmt'},
  {format: 'json'},
]

// let args = [
//   { station: stations[stationIdx].id},
//   // {range: '24'},
//     {units: 'english'},
//   {product: 'datums'},
//   {format: 'json'},
// ]

let works = []

let errors = 0

axios.get(urlWithArguments(url, args), {
  headers: {
    token: process.env.noaaToken,
  }})
  .then(function (response) {

    if (response.data?.error) {
      fs.appendFileSync('./resources/errors.log', response.data.error.message + '\n');

    } else {

      const line = response.data.predictions.map((reading) => reading.v).join(',')

      fs.appendFileSync('./resources/data.csv', line + '\n');

    }



  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
  stationIdx++
  setTimeout(whatIsTheRate, 200)
}

// whatIsTheRate()






// axios.get('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?&station=1611347&range=24&product=water_level&datum=NAVD&units=english&time_zone=gmt&format=json', {
//   headers: {
//     token: process.env.noaaToken,
//   }})
//   .then(function (response) {
//     // handle success

//     console.log(Object.keys(response.data))
//     console.log(response.data.data)

//     // stations.slice(0,3).forEach((station) => {
//     //   console.log("running")
//     //   axios.get(stationHarConURL(station.id), {
//     //     headers: {
//     //       token: process.env.noaaToken,
//     //     }})
//     //     .then(function (response) {
//     //       console.log(Object.keys(response.data))
//     //     }).catch(function (error) {
//     //       // handle error
//     //       console.log(error);
//     //     })
//     //   })
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })




