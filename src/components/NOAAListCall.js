const axios =  require("axios");

require('dotenv').config();

// Master list
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/

// Format
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/9455760.json?units=english

const arguments = [
  {  sortField: 'ID'},
  {  sortorder: 'asc'},
  {  limit: 100  }
]

let url = 'https://www.ncei.noaa.gov/cdo-web/api/v2/locations?' +
arguments.map((argument) => '&'
                              + Object.keys(argument)[0]
                              + '=' + argument[Object.keys(argument)[0]])
                              .join('')

console.log(url)

axios.get(url, {
  headers: {
    token: process.env.noaaToken,
  }})
  .then(function (response) {
    // handle success
    console.log(response.data);
    // console.log(response.data.metadata);
})
  .catch(function (error) {
    // handle error
    console.log(error);
})
