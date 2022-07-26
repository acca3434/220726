// 5교시 수업 진행

// express 모듈 사용
const express = require("express");
// fs 모듈 사용
const fs = require("fs");
// socket.io 모듈 사용
const socketio = require("socket.io");
const body = require("body-parser");
const { isObject } = require("util");

// 서버 객체 만들기
const app = express();

const PORT = 3000;

const server = app.listen(PORT,()=>{
    console.log(PORT , "예 잘 열렸어요");
});
const io = socketio(server);

app.get("/",(req,res)=>{
    fs.readFile("page2.html",(err,data)=>{
        res.end(data)
    });
});

// io.sockets.on("connection"); 클라이언트가 접속했을때
// io.sockets.on("disconnect"); 클라이언트가 종료했을때

io.sockets.on("connection",(socket)=>{
    console.log("첫번째1");
    // 클라이언트에서 socket.emit("message",data);
    // 웹소켓에 연결되어있는 message 이벤트를 실행시켜 준다
    // 밑에 코드
    socket.on("message",(data)=>{
        // 6교시 추가구문
        console.log("세번째3");
        io.sockets.emit("message",data);
    });
});