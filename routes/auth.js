const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { blacklist } = require("../utils/tokenBlacklist");
const { SECRET } = require("../middleware/authMiddleware");

const USER = { username: "admin", password: "1234" };

// POST /login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ error: "Ungültige Credentials" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// GET /verify
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ valid: false });

  const token = authHeader.split(" ")[1];
  if (blacklist.includes(token)) return res.status(401).json({ valid: false });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ valid: true, user: decoded });
  } catch {
    res.status(401).json({ valid: false });
  }
});

// DELETE /logout
router.delete("/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ error: "Kein Token vorhanden" });

  const token = authHeader.split(" ")[1];
  blacklist.push(token);
  res.json({ message: "Erfolgreich ausgeloggt" });
});

module.exports = router;