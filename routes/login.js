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

module.exports = router;
