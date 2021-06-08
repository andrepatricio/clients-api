## Desenvolvimento

- Ter instalado o node, v14.15 ou maior de preferencia
- Adicionar os valores das variaveis no arquivo `.env`
  - SERVER_PORT
  - DB_MONGO_URI

## Uso

| ação                        | comando                       | 
|-----------------------------|-------------------------------|
| rodar o projeto             | `$ docker-compose up`         |

Configuração padrão nesse caso é:
  - SERVER_PORT=3000
  - DB_MONGO_URI=mongodb://andre:andre@mongodb:27017/clients

## API

| método   | caminho                                |
|----------|----------------------------------------|
| `POST`   | `/client`                              |
| `GET`    | `/client/{id}`                         |
| `DELETE` | `/client/{id}`                         |
| `POST`   | `/client/{id}/favorite/{productId}`    |
| `POST`   | `/product`                             |
| `GET`    | `/product`                             |
| `GET`    | `/auth/signin}`                        |
