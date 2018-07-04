const express = require('express');
const router  = express.Router();

// モジュール読み込み
const global = require('../global');
const common = require('../common');
const Board    = require('../library/board');

/* GET home page. */
router.get('/', function(req, res, next) {

  let board = new Board(req.session.own,req.session.matching,null,null);

  res.render('battle',{
    own:req.session.own, //ユーザー情報
    matchingInfo:req.session.matching, //対局情報
    boardInfo:board //盤面情報と移動範囲
  });
});

module.exports = router;