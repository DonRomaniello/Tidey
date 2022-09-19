const axios =  require("axios");

const fs = require('fs')

require('dotenv').config();

let url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=datums'

url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=harcon'

let stations =  []

axios.get(url)
    .then(response => stations = response.data.stations)
    .catch(error => console.log(error))
    // .finally(() => console.log(stations[0]))

    .finally(() => queryAllStations())
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

const queryAllStations = () => {

url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?'

// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/8410834/harcon.json

let args = [
  { station: stations[stationIdx].id},
  // { station: 1612340},
  // {interval: 'h'},
  {range: '24'},
  // {begin_date: '20230101'},
  // {end_date: '20220101'},
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
      fs.appendFileSync('./resources/errors.log',
      stations[stationIdx].id
      + ': '
      + response.data.error.message + '\n');

    } else {

      createJson(response, stationIdx)

      // writeCSVs(response, stationIdx)



    }



  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
  stationIdx++
  setTimeout(queryAllStations, 200)
}

// queryAllStations()

const createJson = (response, stationIdx) => {

  const id = stations[stationIdx].id

  const lat = stations[stationIdx].lat

  const lng = stations[stationIdx].lng

  const name = stations[stationIdx].name

  const predictions = response.data.predictions.map((prediction) => {
    return {
      t : Date.parse(prediction.t),
      v : prediction.v,
    }})

  const entry = {
    id,
    lat,
    lng,
    name,
    predictions
  }


  fs.appendFileSync('./resources/dayData.json', JSON.stringify(entry) + ',\n');

}



const writeCSVs = (response, stationIdx) => {
  const line = stations[stationIdx].id + ','
                   + stations[stationIdx].lat + ','
                   + stations[stationIdx].lng + ','
                  //  + stations[stationIdx].name + ','
                   + response.data.predictions
                   .map((reading) => reading.v)
                   .join(',')

      const header = 'stationId,'
                     + 'lat,'
                     + 'lng,'
                    //  +  'name,'
                     + response.data.predictions
                     .map((reading) => reading.t)
                     .join(',')

      fs.writeFileSync( './resources/dayDataTopLine.csv', header)

      fs.appendFileSync('./resources/dayData.csv', line + '\n');
}




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
