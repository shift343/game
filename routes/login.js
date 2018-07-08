let express = require('express');
let router = express.Router();
let models = require('../models');
let playerInfo = models.ply_player_info; 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* POST home page. */
router.post('/', function(req, res, next) {
  let name = req.body.player_name; //名前
  let password = req.body.password; //パスワード

  // ユーザーが登録済みか判断
  playerInfo.findOne({ where:{
    name: name,
    password: password
  }}).then(result =>{
    if (result) {
      req.session.own = result;
      res.redirect('/matching');
    }else{
      res.render('login', {
        title: 'ログイン',
        noUser: '一致するユーザーはいません'
      });     
    }
  });
});

/* ゲストログイン用簡易ユーザー登録 */
router.post('/byGuest', function(req, res, next) {

  //使用文字の定義
  var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&";
 
  //桁数の定義
  var len = 8;
 
  //ランダムな文字列の生成
  var name = "";
  for(var i=0;i<len;i++){
    name += str.charAt(Math.floor(Math.random() * str.length));
  }
  
  // 新規ユーザー登録
  var newPlayer = new playerInfo({
    name: name,
    password: name
  });
  newPlayer.save().then((record) => {
    req.session.own = record;
    res.redirect('/');
  });
});

module.exports = router;
