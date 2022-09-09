const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/default.json");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    req.isAuth = false;
    return next();
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded) {
      req.isAuth = false;
      return next();
    }
    req.userId = decoded.userId;
    req.isAuth = true;
    return next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
