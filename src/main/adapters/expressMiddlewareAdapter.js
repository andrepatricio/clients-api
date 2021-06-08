const adaptMiddleware = (middleware) => {
  return async (req, res, next) => {
    const request = {
      ...(req.headers || {})
    }
    const response = await middleware.handle(request)
    if (response.status === 200) {
      Object.assign(req, response.body)
      next()
    } else {
      res.status(response.status).json({
        error: response.body
      })
    }
  }
}

module.exports = adaptMiddleware
