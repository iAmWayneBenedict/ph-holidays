const path = require("path");
const express = require("express");
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const route = require("./routes/route")

app.use(express.static(path.join(__dirname + "/src")));

app.listen(8000, "127.0.0.1", function() {
    console.log("Listening on host 127.0.0.1 port 8000")
})
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ph dates API</h1>")
})
app.use("/holiday", route)
