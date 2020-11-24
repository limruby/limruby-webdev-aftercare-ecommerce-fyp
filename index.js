const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User')

require('./utils/db.config')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/register', (req, res) => {
  return res.render('register')
})

app.post('/register', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  return res.render('register', { message: 'Registration successful' })
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
