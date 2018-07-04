let express = require('express');
let router = express.Router();
let models = require('../models');
let playerInfo = models.ply_player_info; 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { 
    title: '新規アカウント登録' 
  });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  let name = req.body.player_name; // 名前
  let password = req.body.password; // パスワード
  
  // 新規ユーザー登録
  playerInfo.findOne({ where:{
    name: name
  }}).then(result =>{
    if (result) {
      res.render('register', {
        title: '新規会員登録',
        nameExists: 'そのアカウント名は既に使われています'
      });
    }else{
      var newPlayer = new playerInfo({
        name: name,
        password: password
      });
      newPlayer.save().then((record) => {
        req.session.own = record;
        res.redirect('/');
      });
    }
  });
});

module.exports = router;
