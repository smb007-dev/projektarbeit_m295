const jwt = require("jsonwebtoken");
const { blacklist } = require("../utils/tokenBlacklist");
const SECRET = "supersecretkey";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Nicht authentifiziert" });

  const token = authHeader.split(" ")[1];
  if (blacklist.includes(token)) return res.status(401).json({ error: "Token ungültig" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token ungültig" });
  }
}

module.exports = { authMiddleware, SECRET };