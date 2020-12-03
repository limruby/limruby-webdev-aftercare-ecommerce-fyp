const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')
const MongoStore = require('connect-mongo')(session)
const mongoDBConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStrategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')
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
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoDBConnection })
}))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'))

app.get('/', authMiddleware, (req, res) => {
  console.log('User:', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(`welcome ${req.user.name}`)
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
