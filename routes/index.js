const express = require('express');
const models = require('../models');
const router = express.Router();

//url:localhost:3000/board에서 show.ejs를 렌더링.
router.get('/board', function(req, res, next) {
  res.render('show');
});

//show.ejs에서 넘어오는 데이터를 post방식으로 받고 create메소드로 db에 추가.
router.post('/board', function(req, res, next) {
  let body = req.body;

  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter
  })
  .then( result => {
    console.log("데이터 추가 완료");
    res.redirect("/board");
  })
  .catch( err => {
    console.log("데이터 추가 실패");
  })
});

//post테이블의 모든 데이터를 findAll()메소드로 호출해 옴.
router.get('/board', function(req,res,next) {
  models.post.findAll().then( result => {
    res.render('show', {
      posts: result
    });
  });
});

//데이터 업데이트 부분.
router.get('/edit/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.findOne({
    where: {id: postID}
  })
  .then( result => {
    res.render("edit", {
      post: result
    });
  })
  .catch( err => {
    console.log("데이터 조회 실패");
  });
});

module.exports = router;
/*
sequelize를 사용하는 궁극적인 목표는 query를 직접 작성하지 않고 
직관적인 이름을 가진 메서드를 사용함으로써 query를 대체하는 것이다.

sequelize는 promise문법이 내부적으로 동작한다.

create() 메소드는 sequelize에서 제공하는 메소드이며 
내부적으로 insert쿼리가 실행된다.
-create 메소드의 인자로는 테이블에 추가할 데이터들을 객체로 정의하여 전달한다.

렌더링 : 논리적인 문서의 표현식을 그래픽 표현식으로 변형시키는 과정.
ex) ejs문서를 홈페이지에 이미지 형식으로 표현.
*/