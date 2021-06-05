const ClientRepository = require('../../../infra/db/repository/clients')

const makeClientRepository = () => {
  return new ClientRepository()
}

module.exports = makeClientRepository
