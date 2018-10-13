const basic = {}

const local = {
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'wxauth',
    pass: 'root',
    char: 'utf8mb4'
  }
}

const prod = {}

module.exports =
  process.env.NODE_ENV === 'development' ? Object.assign({}, basic, local) : Object.assign({}, basic, prod)
