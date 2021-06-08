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
| `POST`   | `/auth/signin`                         |
| `POST`   | `/client`                              |
| `GET`    | `/client/{id}`                         |
| `DELETE` | `/client/{id}`                         |
| `POST`   | `/client/{id}/favorite/{productId}`    |
| `POST`   | `/product`                             |
| `GET`    | `/product`                             |
| `GET`    | `/product/{id}`                        |

### AUTH
#### GET - /auth/sign
> Endpoint para se autenticar no sistema pelo email

payload de exemplo:
```
{
    "email": "andre@gmail.com"
}
```

Possíveis retornos:
##### 200 - ok
response de exemplo:
```
{
    "accessToken": meu_novo_token
}
```

##### 400 - bad request
> Se não enviar um email

##### 401 - unauthorized
> Caso tente acessar com um email não cadastrado


### CLIENT
#### POST - `/client` 
> Endpoint para criar usuários

payload de exemplo:
```
{
    "name": "André",
    "email": "andre@gmail.com"
}
```

Possíveis retornos:
##### 200 - ok
response de exemplo:
```
{
    "favorites": [],
    "_id": "60bec0c18be3fc42270c752a",
    "name": "André",
    "email": "andre@gmail.com",
    "__v": 0
}
```

##### 400 - bad request
> Se não enviar um email ou nome
  Ou o email já for cadastrado

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo


#### GET - `/client/{id}` 
> Endpoint para buscar informações do usuário por id

Parâmetro necessário:
`id` - identificador do cliente

Possíveis retornos:
##### 200 - ok
response de exemplo:
```
{
    "favorites": [
        {
            "_id": "60bf581700d6500014c6989c",
            "brand": "LG",
            "title": "TV 4k 60 polegas",
            "price": 3500,
            "image": "imagens.com/minhaTV",
            "reviewScore": 5,
            "__v": 0
        }
    ],
    "_id": "60bf580a00d6500014c6989b",
    "name": "Andre",
    "email": "andre@gmail.com",
    "__v": 1
}
```

##### 400 - bad request
> Caso o id seja inválido 

##### 404 - not found
> Caso o id não exista na base

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo


#### DELETE - `/client/{id}` 
> Endpoint para remover informações do usuário por id

Parâmetro necessário:
`id` - identificador do cliente

Possíveis retornos:
##### 200 - ok

##### 400 - bad request
> Caso o id seja inválido 

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo


#### POST - `/client/{id}/favorite/{productId}` 
> Endpoint para registrar um produto como favorito para um client

Parâmetro necessário:
`id` - identificador do cliente
`productId` - identificador do produto

Autenticação:
 > Somente um usuário autenticado pode adicionar produtos para o seu registro, por isso é necessário enviar um `accessToken` no header
`Authorization: Bearer <accessToken>`

Possíveis retornos:
##### 200 - ok
response de exemplo: 
```
{
    "favorites": [
        "60bf581700d6500014c6989c"
    ],
    "_id": "60bf580a00d6500014c6989b",
    "name": "Andre",
    "email": "andre@gmail.com",
    "__v": 1
}
```

##### 400 - bad request
> Caso o produto já esteja marcado como favorito ou não exista

##### 401 - unauthorized
> Caso o accessToken não seja da pessoa na qual o produto vai ser adicionado com favorito

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo


### PRODUCT
#### POST - `/product` 
> Endpoint para criar productos

Parâmetros obrigatórios:

| label   | tipo             |
|---------|------------------|
| `brand` | `string`         |
| `title` | `string`         |
| `image` | `string`         |
| `price` | `number`         |

payload de exemplo:
```
{
    "price": 3500,
    "brand": "LG",
    "title": "TV 4k 60 polegas",
    "image": "imagens.com/minhaTV"
}
```

Possíveis retornos:
##### 200 - ok
response de exemplo:
```
{
    "_id": "60bf581700d6500014c6989c",
    "brand": "LG",
    "title": "TV 4k 60 polegas",
    "price": 3500,
    "image": "imagens.com/minhaTV",
    "reviewScore": 5,
    "__v": 0
}
```

##### 400 - bad request
> Se um dos campos obrigatórios não for enviados ou enviados em formatos errados

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo


#### GET - `/product` 
> Endpoint para buscar informações de todos os produtos

Parâmetro de url opcionais:
`page`
`limit`

Possíveis retornos:
##### 200 - ok
response de exemplo:
```
[
    {
        "_id": "60bf581700d6500014c6989c",
        "brand": "LG",
        "title": "TV 4k 60 polegas",
        "price": 3500,
        "image": "imagens.com/minhaTV",
        "reviewScore": 5,
        "__v": 0
    },
    {
        "_id": "60bee1e1305e540014afa49c",
        "brand": "LG",
        "title": "TV 4k 60 polegas",
        "price": 3500,
        "image": "imagens.com/minhaTV",
        "reviewScore": 5,
        "__v": 0
    }
]
```

##### 400 - bad request
> Caso os parâmetros sejam inválidos, `page` negativo por exemplo

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo


#### GET - `/product/{id}` 
> Endpoint para buscar informações do produto por id

Parâmetro necessário:
`id` - identificador do produto

Possíveis retornos:
##### 200 - ok
response de exemplo:
```
{
    "_id": "60bf581700d6500014c6989c",
    "brand": "LG",
    "title": "TV 4k 60 polegas",
    "price": 3500,
    "image": "imagens.com/minhaTV",
    "reviewScore": 5,
    "__v": 0
}
```

##### 400 - bad request
> Caso o id seja inválido 

##### 404 - not found
> Caso o id não exista na base

##### 500 - server internal error
> Em caso de alguma falha no servidor, perder a conexão com a base de dados por exemplo






