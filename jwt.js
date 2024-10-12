const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.send("No Token Found");

  try {
    const username = jwt.verify(token, secret);

    req.username = username;
    next();
  } catch (error) {
    res.send(error);
  }
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "30m" });
};

module.exports = { generateToken, jwtMiddleware };
