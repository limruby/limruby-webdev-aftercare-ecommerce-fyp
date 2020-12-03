const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('Conneted to MongoDB')
})

module.exports = mongoose.connection
