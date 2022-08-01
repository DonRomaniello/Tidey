const axios =  require("axios");

require('dotenv').config();

// Master list
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/


// https://www.ncdc.noaa.gov/cdo-web/webservices/v2

// Format
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/9455760.json?units=english


// /api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20220801&end_date=20220802&datum=MLLW&station=8518949&time_zone=lst_ldt&units=english&interval=hilo&format=json

// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredicitons

const arguments = [
  {  sortField: 'ID'},
  {  sortorder: 'asc'},
  {  limit: 100  }
]

let url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations?'

url = url
      + arguments.map((argument) => '&'
                                    + Object.keys(argument)[0]
                                    + '='
                                    + argument[Object.keys(argument)[0]])
                                    .join('')



url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

axios.get(url, {
  headers: {
    token: process.env.noaaToken,
  }})
  .then(function (response) {
    // handle success
    console.log(Object.keys(response.data));
    // console.log(response.data.metadata);
})
  .catch(function (error) {
    // handle error
    console.log(error);
})

