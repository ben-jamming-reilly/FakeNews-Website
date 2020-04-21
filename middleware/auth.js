const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function has access to both request
//response functions
module.exports = function(req, res, next){
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if(!token){
    return res.status(401).json({msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg: 'Token is not valid'});
  }
}
