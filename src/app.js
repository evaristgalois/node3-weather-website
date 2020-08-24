const path = require('path')
const express = require('express')
const { isAbsolute } = require('path')
const hbs = require('hbs')
const { registerPartials } = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name:'Armando Albornoz'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Armando'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'nito aiuda',
    name: 'Armando Albornoz'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error:'You must provide an address.'
    })
  }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if(error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({error})
        }
        res.send({
          forecast:data,
          location,
          address:req.query.address  
        })
      })
    })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
     return res.send({
        error:'You must provide a search value!'
      })
  } 

  console.log(req.query.search)
  res.send({
    products:[]
  
  })
})
  


app.get('/help/*', (req, res) => {
  res.render('helpErrorPage', {
    error: 'Help article not found',
    title: '404',
    name: 'Armando Albornoz'
  } )
})

app.get('*', (req, res) => {
    res.render('generalErrorPage', {
      error: 'Page not found',
      title: '404',
      name: 'Armando Albornoz'
  
    })
})


app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

