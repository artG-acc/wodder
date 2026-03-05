const express = require("express");
const router = express.Router();

const { showProgramDay } = require("../controllers/programController");

// Example: /program/1, /program/22, etc.
router.get("/program/:day", showProgramDay);

module.exports = router;