const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, SECRET);
  } catch (error) {
    // console.log(error.message);
    return response.status(401).json(error);
  }

  next();
};
