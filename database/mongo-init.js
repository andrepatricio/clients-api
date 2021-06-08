/* eslint-disable no-undef */
db.createUser(
  {
    user: 'andre',
    pwd: 'andre',
    roles: [
      {
        role: 'dbOwner',
        db: 'clients'
      }
    ]
  }
)
