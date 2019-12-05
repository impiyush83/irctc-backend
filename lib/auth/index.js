function HasRole (role) {
  return function (req, res, next) {
    if (role !== req.headers.role) {
      return res.status(401).json({'success': false, 'message': 'Not Authorized'})
    }
    next()
  }
}

module.exports = {
  HasRole
}
