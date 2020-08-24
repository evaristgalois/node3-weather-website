const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=745ffe824474ebfb0c8be5dae69821b0&query='+longitude+','+latitude+'&units=f'
  request({url , json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Error, try again', undefined)
    } else {
      callback(undefined ,'It is ' + body.current.weather_descriptions[0] + ' and it is ' + body.current.temperature + ' degrees out. It feels like '  + body.current.feelslike +  ' degrees out. There is a ' + body.current.precip + '% chance of rain.'  )

    }
    
  }) 

}

module.exports = forecast