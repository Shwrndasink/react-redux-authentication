const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");

const app = express();
const router = require("./router");
const mongoose = require("mongoose");

mongoose.createConnection("mongodb://127.0.0.1:auth/auth");

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port: " + port);
