const express = require('express');
const router  = express.Router();
const playerInfo = require('../library/db/sql/player/player_info');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('matching/index',{
    own:req.session.own //ユーザー情報
  });
});

/* POST home page. */
router.post('/', function(req, res, next) {

  let matchingInfo = {
    roomId:req.body.roomId,
    sente:req.body.sente,
    gote:req.body.gote
  }
  
  playerInfo.getPlayerInfoByMatchingInfo(matchingInfo).then(function(value){
    // プレイヤー情報があれば上書き
    if(value) {
      matchingInfo.sente = value.sente;
      matchingInfo.gote  = value.gote;
    }
    req.session.matching = matchingInfo; //試合情報をsessionに詰める
    res.redirect('/battle');
  }).catch(function(error){
    console.log("マッチングに失敗しました");
    res.redirect('/');
  });
});

module.exports = router;