const express = require('express');
const router  = express.Router();

const Board    = require('../library/board');

let matching = {
  sente:15,
  gote:20
}
let own = {
  id:15
}
let board = new Board(own,matching,null,null);
console.log(board);

/* GET home page. */
router.get('/', function(req, res, next) {

  let board = new Board(req.session.own,req.session.matching,null,null);

  res.render('battle',{
    own:req.session.own, //ユーザー情報
    matchingInfo:req.session.matching, //対局情報
    boardInfo:board //盤面情報
  });
});

module.exports = router;