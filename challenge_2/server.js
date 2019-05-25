const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

const port = 3001

const app = express()

app.get('/', (req, res) => res.sendfile(path.join(__dirname, './public/index.html')))

app.get('/rates', (req, res) => {
  fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2011-04-30&end=2019-04-30')
  .then(res => res.json())
  .then(data => {res.send(data)})
  .catch(err => {
    console.log(err)
  })
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Cryptocurrency Charting Tool running on port ${port}`))