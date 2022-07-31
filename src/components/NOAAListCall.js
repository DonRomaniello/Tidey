const axios =  require("axios");

// Master list
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/

// Format
// https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/9455760.json?units=english



const getStations =  async () => {

  let stations = await axios.get('https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/portsstation.json')
  .then(function (response) {
    // handle success
    return response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  return stations

}

export default getStations
