//express 프레임워크를 가지고와 express 라는 변수에 넣음
const express = require('express');
//app 객체 생성
const app = express();
//app객체 포트넘버 설정
const port = 3000;
//goodsRouter 변수안에 goods.js를 가져옴
const postsRouter = require('./routes/posts')
const commentsRouter = require("./routes/comments")

const connect = require("./schemas")
connect()
//body-parser-middleware 를 쓰기위한 문법 (전역 미들웨어)
//req안에 있는 body 데이터를 사용하겠다. 데이터 파싱
app.use(express.json())

//app.use를사용해 API등록,
//app.use() 안에 있는 코드들이 실행된 다음에 그 밑에있는 코드들 실행
//api라는 경로가 추가되면 모두 goodsRouter로 가라는 의미
//localhost:3000/api => goodsRouter로 이동
// app.use("/api", [goodsRouter, userRouter, adminRouter]); 처럼 배열로 라우터를 사용할 수 있다.
app.use("/work", [postsRouter, commentsRouter]);

//3000번 포트에서 app.js실행
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

