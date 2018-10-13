const DEFAULT_RESPONSE_BODY = {
  success: true,
  message: '',
  data: null
}

function success (data) {
  return Object.assign({}, DEFAULT_RESPONSE_BODY, {data})
}

function failed (err) {
  let message = err
  if (err instanceof Error) {
    message = err.message
  }
  return Object.assign({}, DEFAULT_RESPONSE_BODY, {success: false, message})
}

module.exports = function () {
  return function responseGen (req, res, next) {
    res.success = function (data) {
      res.json(success(data))
    }
    res.failed = function (err) {
      res.json(failed(err))
    }
    next()
  }
}
