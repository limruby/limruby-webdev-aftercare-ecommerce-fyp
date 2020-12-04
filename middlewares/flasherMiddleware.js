/**
 * If we have data in req.session.flashData, we are assigning to res.local and the respective req.session.flashdata var
 */
const flasherMiddleware = (req, res, next) => {
  if (req.method === 'GET') {
    if (req.session.flashData) {
      for (const key in req.session.flashData) {
        res.locals[key] = req.session.flashData[key]
      }
      req.session.flashData = null
    }
  }
  return next()
}

module.exports = flasherMiddleware
