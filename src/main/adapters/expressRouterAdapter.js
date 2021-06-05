const adaptRoute = (controller) => {
  return async (req, res) => {
    const request = {
      body: req.body,
      params: req.params,
      query: req.query
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.status >= 200 && httpResponse.status <= 299) {
      res.status(httpResponse.status).json(httpResponse.body)
    } else {
      res.status(httpResponse.status).json({
        error: httpResponse.body
      })
    }
  }
}

module.exports = adaptRoute
