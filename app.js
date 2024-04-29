require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const {connectDB} = require("./db/connect.js");
const router = require("./routes/tasksRoutes");
const {errorHandlerMiddleware} = require("./middleware/errorHandlerMiddleware")
const {notFoundMiddleware} = require("./middleware/notFoundMiddleware")

const port = process.env.PORT || 3000;

const swaggerDocument = YAML.load("./swagger.yaml");

const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/docs",(req,res,next)=>{
    res.send(`<a href="/api-docs">Documentation</a>`);
})

app.use(express.json());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));
app.use("/api/v1/tasks",router);

io.on("connection", (socket) => {
    console.log(`socket is listening ${socket}`);
    console.log(socket)
})
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function start() {
    try {
        await connectDB(process.env.MONGO_URI);// require dotenv configurations
        server.listen(port, function () {
            console.log(`Server is listening at port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
