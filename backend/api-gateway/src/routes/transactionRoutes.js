const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Transaction Service is Working!");
});

module.exports = router;
