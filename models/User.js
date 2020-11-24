const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name cannot be smaller than 2 characters'],
    maxlength: [64, 'Name cannot be hreater than 64 characters']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [128, 'Name cannot be hreater than 128 characters'],
    index: true
  },

  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const User = mongoose.model('users', userSchema)

module.exports = User
