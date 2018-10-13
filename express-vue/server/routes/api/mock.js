const express = require('express')
const router = express.Router()

router.get('/success', function (req, res) {
  res.json({
    success: true,
    data: 'mock data'
  })
})

router.get('/failed', function (req, res) {
  res.json({
    success: false,
    message: 'request failed'
  })
})

router.get('/cookie', function (req, res) {
  const times = +req.cookies.times || 0
  console.log(times)
  res.cookie('times', times + 1)
  res.json({ success: true })
})

router.get('/serverError', function (req, res) {
  throw new Error('mock server error')
})

module.exports = router
