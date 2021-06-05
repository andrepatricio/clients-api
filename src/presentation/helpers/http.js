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

module.exports = {
  badRequest,
  OK,
  serverInternal,
  notFound
}
