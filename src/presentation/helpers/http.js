const badRequest = (e) => ({
  status: 400,
  body: e
})

const serverInternal = (e) => ({
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
  serverInternal
}
