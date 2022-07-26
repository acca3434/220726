
const { Socket } = require("dgram");
const express = require("express");
const fs = require('fs');
const socketio = require("socket.io");

const app = express();

const PORT = 3000;

const server = app.listen(PORT,()=>{
    console.log(PORT,"빈포트 사용중");
})

app.get('/',(req,res)=>{
    fs.readFile("page.html",(err,data)=>{
        res.end(data);
    })
});

const io = socketio(server);
let userid = [];

io.sockets.on("connection",(socket)=>{
    console.log("유저가 접속함");
    userid.push(socket.id);
    console.log(userid); 
    //3교시 추가문구
    socket.on("hi", (data)=>{
        console.log(data,"에서 보냄 웹소켓 hi 이벤트가 실행");

        io.sockets.to(data.id).emit("hi",data.msg);
    });
});
