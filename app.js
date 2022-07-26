/*

    첫번째 교시

    웹소켓과 클라이언트가 양방향 통신할 수 있게 도와주는 소켓io

    socket.io는 왜쓰고 뭘까
    실시간으로 웹 애플리케이션을 위한 자바스크립트 라이브러리
    웹 클라이언트와 서버간의 실시간 양방향 통신을 가능하게 해주는
    node.js 모듈

    가상화폐 거래소같은 데이터 전송이 많은 경우 빠르고 비용이 싸게
    표준 웹소켓을 사용하는게 좋다.
    실제 업비트나 바이낸스 소켓 API를 사용하면
    데이터가 정말 많이 들어온다.

    socket.io는 웹소켓 프로토콜을 지원해주는 네트워크 라이브러리
    비동기 이벤트 방식으로 실시간으로 간단하게 데이터를 요청하고 받을 수 있다.

    예를 들어서 웹에 고객센터 채팅 같은 것도 socket.io 라이브러리를 사용해
    페이지를 새로고침 하지 않아도 실시간으로 응답한다.

    socket.io 많이 쓰는 메서드

    on : 이벤트에 매칭해서 소켓 이벤트 연결
    emit : 소켓 이벤트 발생

    사용했던거 express를 사용할거고 socket.io의 모듈 3개 설치할거에요

    express, fs, socket.io
    새로고침 하기 귀찮으니까 nodemon도 설치할게영

    express 설치 명령어

    npm i express
    mpn i socket.io
    npm i fs
    npm i nodemon

    설치가 다 됐으면 module을 가져오겠습니당

*/
const { Socket } = require("dgram");
const express = require("express");
const fs = require('fs');
const socketio = require("socket.io");

const app = express();
// 실행을 하면 서버에 본체가 만들어지고
// 각 앱에 app.listen()
const PORT = 3000;
// 2교시 const server = 를 추가
const server = app.listen(PORT,()=>{
    console.log(PORT,"빈포트 사용중");
})

// /는 첫 주소를 의미함
app.get('/',(req,res)=>{
    fs.readFile("page.html",(err,data)=>{
        res.end(data);
    })
});

// socketio(매개 변수) 매개변수는 express server
// 소켓 서버를 생성 및 실행
const io = socketio(server);
let userid = [];
// 2교시 시작
// socketio 사용해서 연결
// 옛날에는 함수를 사용해서 연결했는데
// express는 다름
// connection - > 클라이언트가 웹소켓 서버에 접속할때 발생한다.

// on함수로 connection 이벤트에 매칭해서 소켓 이벤트 발생
io.sockets.on("connection",(socket)=>{
    console.log("유저가 접속함");
    userid.push(socket.id);
    console.log(userid); 
    //3교시 추가문구
    socket.on("hi", (data)=>{
        console.log(data,"에서 보냄 웹소켓 hi 이벤트가 실행");
        // 자기 자신에게 발생
        // socket.emit("hi","웹소켓에서 클라이언트로 보냄");
        // 모든 대상에게 발생
        // 접속한 사용자 전부에게 메세지 발송
        // 자기 자신을 포함하지 않고 방송하는것처럼 메세지를 전송하는것마냥 하는것도 있습니다
        // io.sockets.emit("hi","모두에게");
        // socket.broadcast.emit("hi","나 빼고 모두");
        // 하나 더 비밀대화

        io.sockets.to(data.id).emit("hi",data.msg);
    });
});
