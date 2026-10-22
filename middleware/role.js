module.exports = (req, res, next) => {
  if (req.session.user.role !== 'admin') {
    return res.send('无权限访问');
  }
  next();
};
