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
