const badRequest = e => ({
  status: 400,
  body: e
})

const notFound = (resource, id) => ({
  status: 404,
  body: `${resource} ${id} not found`
})

const serverInternal = e => ({
  status: 500,
  body: e
})

const OK = (body) => ({
  status: 200,
  body
})

const forbidden = (e) => ({
  status: 403,
  body: e
})

const unauthorized = () => ({
  status: 401
})

module.exports = {
  badRequest,
  OK,
  serverInternal,
  notFound,
  forbidden,
  unauthorized
}
