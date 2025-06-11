const express = require("express");
const cors = require("cors");
const queryRoute = require("./routes/query");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/query", queryRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`HistoriAI backend running on port ${PORT}`));