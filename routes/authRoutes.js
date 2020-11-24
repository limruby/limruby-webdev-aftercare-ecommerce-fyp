/**
 * Import servers to serve pages, only able to call function and show error, all functions in /modules
 */
const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')

/**
 * Shows page for user registration
 */
router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})
/**
 * Handles user registration
 */
router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      // return res.send(joiErrorFormatter(validationResult.error))
      return res.render('register', { message: 'Validation errors' })
    }
    const user = await addUser(req.body)
    return res.render('register', { message: 'Registration successful' })
  } catch (e) {
    console.error(e)
    return res.send(mongooseErrorFormatter(e))
    return res.status(400).render('register', { message: 'Something went wrong' })
  }
})

module.exports = router
