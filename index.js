const express = require("express");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const logger = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();
const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

const server = app.listen(4000, () => {
	console.log(`✅ server listen http://localhost:4000`);
});

const io = socketIo(server);

const clientMap = {};

io.on("connection", (socket) => {
    console.log(`✅ Socket Connect`);
    clientMap[socket.id] = socket;

    /**
     * Nickname Setting
     */
    socket.on("setNickname", (data) => {
        socket.nickname = data.nickname;
        socket.broadcast.emit("joinUser", { nickname: data.nickname});
    });

    /**
     * Chat Setting
     */
    socket.on("sendMsg", (data) => {
        /* send msg broadcast */
        socket.broadcast.emit("sendMsg", { msg: data.msg, from: socket.nickname});
    });

    /**
     * Common Setting
     */
    socket.on("close", () => {
        delete clientMap[socket.id];

        /* send msg broadcast */
        socket.broadcast.emit("leaveUser", { from: socket.nickname});
    });

});
