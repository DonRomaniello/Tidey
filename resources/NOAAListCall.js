const axios =  require("axios");

require('dotenv').config();

// Master list
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/


// https://www.ncdc.noaa.gov/cdo-web/webservices/v2

// Format
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/9455760.json?units=english


// /api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20220801&end_date=20220802&datum=MLLW&station=8518949&time_zone=lst_ldt&units=english&interval=hilo&format=json

// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredicitons


let url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations?'



// url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

// url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/mode.json'

// let stationID = '8418150'


let stations = []

let args = [
  { station: '8454000'},
  {begin_date: '20130808'},
  {end_date: '20130809'},
  {product: 'water_level'},
  {datum: 'NAVD'},
  {units: 'metric'},
  {time_zone: 'gmt'},
  {format: 'json'},
]


url = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?'

  const urlWithArguments = (url, args) => {
    let returnURl =  url + args.map((argument) => '&'
                                  + Object.keys(argument)[0]
                                  + '='
                                  + argument[Object.keys(argument)[0]])
                                  .join('')

    console.log(returnURl)

    return returnURl
}

axios.get(urlWithArguments(url, args), {
  headers: {
    token: process.env.noaaToken,
  }})
  .then(function (response) {
    // handle success

    console.log(response.data)

    // stations.slice(0,3).forEach((station) => {
    //   console.log("running")
    //   axios.get(stationHarConURL(station.id), {
    //     headers: {
    //       token: process.env.noaaToken,
    //     }})
    //     .then(function (response) {
    //       console.log(Object.keys(response.data))
    //     }).catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //   })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })




