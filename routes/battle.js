const express = require('express');
const router  = express.Router();

// board情報を送る
const board = GlobalVar.InitPlace;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('battle/index',{
    boardInfo:board, //盤面情報
    matchingInfo:req.session.matching, //マッチング情報
    own:req.session.own //ユーザー情報
  });
});

module.exports = router;