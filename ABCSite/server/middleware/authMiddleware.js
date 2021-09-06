const { verify } = require("jsonwebtoken");

const validToken = (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.json({ err: "No token" });

  try {
    const validToken = verify(token, "secret");
    req.userData = validToken;
    if (validToken) return next();
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { validToken };
