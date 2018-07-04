const express = require('express');
const router  = express.Router();
const common = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('matching',{
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

  //console.log(JSON.stringify(req.body.matchingInfo.roomId));
  req.session.matching = matchingInfo; //試合情報をsessionに詰める
  res.redirect('/battle');
});


module.exports = router;