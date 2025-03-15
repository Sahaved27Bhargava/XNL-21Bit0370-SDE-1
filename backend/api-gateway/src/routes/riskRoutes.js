const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Risk Service is Working!");
});

module.exports = router;
