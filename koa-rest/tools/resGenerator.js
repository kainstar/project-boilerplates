const RESPONSE_TEMPLATE = {
  success: true,
  message: '',
  data: null
}

exports.success = function (data) {
  return Object.assign({}, RESPONSE_TEMPLATE, {data})
}

exports.failed = function (err) {
  let message = err
  if (err instanceof Error) {
    message = err.message
  }
  return Object.assign({}, RESPONSE_TEMPLATE, {success: false, message})
}
