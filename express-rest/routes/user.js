const {Router, Get} = require('express-derouter')

@Router('/user')
class UserController {
  @Get('/')
  index (req, res) {
    res.success('respond with a resource')
  }
}

module.exports = UserController
