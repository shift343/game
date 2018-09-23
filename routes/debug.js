var express = require('express');
var router = express.Router();

// board情報を送る
const board = GlobalVar.InitPlace;

let matching = {
  room:220,
  own:15,
  sente:15,
  gote:20
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('debug/index',{
    boardInfo:board, //盤面情報
    matchingInfo:matching, //マッチング情報
  });
});

module.exports = router;
