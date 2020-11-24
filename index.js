const express = require('express')
require('./utils/db.config')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.send('Hello')
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
