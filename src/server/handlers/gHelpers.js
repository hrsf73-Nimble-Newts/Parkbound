const axios = require('axios')

const geocode = location => {

  // uncomment the next line to receive an example request
  // let location = 'Beaverdam Creek Swamp'

  const config = {
    method: 'get',
    url: 'http://maps.googleapis.com/maps/api/geocode/json',
    headers: {
      key: process.env.G_MAPS_GEOCODING_API_KEY,
    },
    params: {
      address: location,
    }
  }

  return axios(config).then(response => {
    return response.data.results[0].geometry.location
  }).catch(error => {
    console.log(error)
  })

}


module.exports = {
  geocode: geocode
}

// export default geocode