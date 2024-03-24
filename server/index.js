const express = require("express")
const cors = require("cors");
const app = express();
const port = 3000;
const route = require("./routes/route")


app.use(cors())
app.use(express.json())
app.use(route)


app.listen(port, console.log("serveur demarre...."))