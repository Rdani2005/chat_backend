const express = require("express");
const path = require("path");
require("dotenv").config();

// DB Connection
const { dbConnection } = require("./database/config");
dbConnection();

// Express App
const app = express();

// Read and pase JSON
app.use(express.json());

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.use("/api/login", require("./routes/auth"));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log(`Server running on port: http://localhost:${process.env.PORT}`);
});
