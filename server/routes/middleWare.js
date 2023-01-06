const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require("../models/User");

const verifyToken =  (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SC, async(err, user) => {
      if (err) return res.status(403).json(err);
      const newUser = await User.findById(user.id)
      req.user = newUser;
      next();
    });
  }
  else res.status(401).json("You are not authenticated!");
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else res.status(403).json("You are not alowed to do that!");
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  // console.log(req)
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin,
};
