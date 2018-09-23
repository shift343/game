let global = require('../global.js');
let io = require('socket.io').listen(global.server);
let models = require('../models');
let matchingInfo = models.cmn_battle_matching;

// マッチング用の名前空間
let matching = io.of('/matching');

// 対局用の名前空間
let battle = io.of('/battle');

// マッチング処理
matching.on("connection",function(socket){
  socket.on("matchingStart", function (playerInfo) {
    
    matchingInfo.findOne({ where:{
      status: 1
    }}).then(result =>{

      // 募集中のroomが存在しなかったら新規レコード作成
      if (!result) {
        var newRoom = new matchingInfo({
          status: 1,
          player1: playerInfo.id
        });
        newRoom.save().
        then((record) => {
          socket.join(record.id);
          console.log("player1が部屋番号"+record.id+"に入室しました");
          matching.in(record.id).emit("matchingEnd");
        });

      // roomが存在したらレコード更新
      }else{
        result.player2 = parseInt(playerInfo.id);
        result.status = 2;
        result.save().
        then((record) => {
          socket.join(record.id);
          console.log("player2が部屋番号"+record.id+"に入室しました");

          // 適当に先手・後手を決める
          let rand = Math.floor(Math.random() * 2);

          if(rand > 1){
            sente = record.player1;
            gote  = record.player2;
          }else{
            sente = record.player2;
            gote  = record.player1;
          }

          result = {
            roomId :record.id,
            sente :sente,
            gote :gote
          }

          matching.in(record.id).emit("matchingEnd",result);
        });
      }
    });
  });
});


// 対局処理
battle.on("connection", function (socket) {

  // 部屋入室
  socket.on("joinBattle", function (roomId) {
    socket.join(roomId);
  });

  // 駒移動処理
  socket.on("moveKoma", function (data) {

    let roomId     = data.roomId;     // 部屋ID
    let board      = data.board;      // 盤面情報
    let moveFrom   = data.fromPos;    // 移動前
    let moveTo     = data.toPos;      // 移動先
    let koma       = board[moveFrom]; // 駒情報
    let isEvolve   = data.isEvolve;   // 駒成か

    // 盤面の更新
    board = GlobalFunc.UpdateBoard(board,koma,moveFrom,moveTo,isEvolve);

    // 自分に送る情報をまとめる
    ownData = {
      board: board,
      koma: koma,
      moveFrom: moveFrom,
      moveTo: moveTo,
      teban: false,
      isOwn: true
    }
　
    // 相手に送る情報をまとめる
    enemyData = {
      board: board,
      koma: koma,
      moveFrom: moveFrom,
      moveTo: moveTo,
      teban: true,
      isOwn: false
    }

    // 盤面情報を送る
    battle.to(socket.id).emit('updateBoard', ownData);
    socket.broadcast.to(roomId).emit("updateBoard", enemyData);

  });

});