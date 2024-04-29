const express = require("express");
const app = express();
const io = require("socket.io");
const http = require("http");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

app.get("/tasks", (req, res) => {
    res.send("hello world");
})

server.listen(port, function () {
    console.log(`Server is listening at port ${port}`);
})