const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/admin/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", user: req.user });
});

module.exports = router;
