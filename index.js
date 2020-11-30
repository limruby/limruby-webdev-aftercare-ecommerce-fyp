const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
// encrypting session data, secret generated randomly from node crypto
  secret: 'dbef350b8b247452a132cbdd04c7bea371c87e95',
  resave: false,
  saveUninitialized: true,
  // false because we use localhost, set true for HTTPS and certificate installation in browser
  cookie: { secure: false }
}))

app.use('/', authRoutes)
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`You have visited ${req.session.views} times`)
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
