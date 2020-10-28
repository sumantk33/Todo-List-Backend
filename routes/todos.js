const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).json({ msg: "Get req" });
});

module.exports = router;
