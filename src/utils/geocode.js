const request = require('request')


const geocode = (address, callback) => {
  url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXZhcmlzdGdhbG9pcyIsImEiOiJja2R1eTFpb2cxYmhxMzFscXo4MHc2bDAyIn0.d585XdHd62WcK5bKb-tPEQ&limit=1'

  request({ url , json: true}, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather service', undefined)
    } else if(body.features.length === 0) {
        callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name

     })
    }

  })
}



module.exports = geocode
  
