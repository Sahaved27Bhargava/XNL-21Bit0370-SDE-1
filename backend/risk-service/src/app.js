const express = require("express");
const app = express();

app.get("/api/risk", (req, res) => {
    res.json({ message: "Risk Management Service is running!" });
});

const PORT = 5003;
app.listen(PORT, () => console.log(`✅ Risk Service running on port ${PORT}`));
