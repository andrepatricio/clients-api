const { server } = require('./environment/envs')
const app = require('./config/app')
require('../infra/db/config/db')

app.listen(server.port, () => console.log(`Rodando na porta: ${server.port} `))
