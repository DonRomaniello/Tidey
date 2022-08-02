const axios =  require("axios");

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

let url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

let stations =  []

axios.get(url)
    .then(response => stations = response.data.stations)
    .catch(error => console.log(error))
    // .finally(() => console.log(stations))
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

const whatIsTheRate = () => {

console.log(stations[stationIdx])

url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?'

let args = [
  { station: stations[stationIdx].id},
  {range: '24'},
  {product: 'water_level'},
  {datum: 'MLLW'},
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

axios.get(urlWithArguments(url, args), {
  headers: {
    token: process.env.noaaToken,
  }})
  .then(function (response) {
    // handle success
    console.log(response.data)
  })
  .catch(function (error) {
    // handle error
    // console.log(urlWithArguments(url, args))
    console.log(error);
  })
  stationIdx++
  // setTimeout(whatIsTheRate, 1000)
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



