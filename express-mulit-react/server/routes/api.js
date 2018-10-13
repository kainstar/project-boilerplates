const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/success', function(req, res) {
  res.json({
    success: true,
    message: '',
    data: 'hello api'
  });
});

router.get('/failed', function(req, res) {
  res.json({
    success: false,
    message: 'mock request failed',
    data: null
  });
});

router.get('/error', function(req, res) {
  res.status(500).send();
});

module.exports = router;
