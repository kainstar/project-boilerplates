const {Router, Get} = require('express-derouter')

@Router('/')
class IndexController {
  @Get('/')
  index (req, @Res res, next) {
    res.success({ title: 'Express', num: 1 })
  }
}

module.exports = IndexController
