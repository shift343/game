//駒画像を表示する関数
function dispInitKomaImg(){
    $(".isOwn").each(function() {
        let komaId  = $(this).attr('name');
        let komaImg = getKomaImg(komaId,true);
        $(this).append("<img src='/images/pieces/"+komaImg+"' height='100%'>");
    });

    $(".isEnemy").each(function() {
        let komaId  = $(this).attr('name');
        let komaImg = getKomaImg(komaId,false);
        $(this).append("<img src='/images/pieces/"+komaImg+"' height='100%'>");
    });
}

function updateKomaImg(koma,moveFrom,moveTo,isOwn){

      // 移動前の要素更新
      let fromId = $("#"+moveFrom);
      $(fromId).attr("name",""); 
      $(fromId).removeClass("isOwn").removeClass("isEnemy");
      $(fromId).children("img").remove();
    
      // 移動後の要素更新
      let toId = $("#"+moveTo);
      $(toId).attr("name",koma);
      if(isOwn) {
        $(toId).removeClass("isEnemy").addClass("isOwn"); //動かした側
      } else {
        $(toId).removeClass("isOwn").addClass("isEnemy"); //動かされた側
      }

      // 移動後のチカチカを消す
      $(".square").each(function() {
        $(this).removeClass("onTaped");
      });
      // 移動後のチカチカをつける
      $(toId).addClass("onTaped");

      $(toId).children("img").remove();
      let komaImg = getKomaImg(koma,isOwn);
      $(toId).append("<img src='/images/pieces/"+komaImg+"' height='100%'>");    
}

/* ブラックアウト&移動可能範囲付与 */
function addBlackOut_SelectArea(komaInfo,toPos){
  $(".square").each(function(){
    let id = parseInt($(this).attr("id"));

    //console.log(board[id].moveArea);
    if(id != toPos && $.inArray(id, komaInfo["moveArea"]) == -1) {
      $(this).children("div").addClass("blackOut");
    } else if($.inArray(id, komaInfo["moveArea"]) >= 0) {
      $(this).addClass("selectArea");
    }
  });
}

/* 選択フラグ、ブラックアウト、移動可能範囲をクリア */
function removeOnTap_SelectArea_BlackOut(){
    $(".square").each(function() {
        $(this).removeClass("onTap");
        $(this).removeClass("selectArea");
        $(this).children("div").removeClass("blackOut");
    });
}

/* 駒画像 */
function getKomaImg(koma,isOwn){
    if(isOwn){
        switch(Number(koma)){
            case 0 : return "Sfu.png";
            case 1 : return "Skyo.png";
            case 2 : return "Skei.png";
            case 3 : return "Sgin.png";
            case 4 : return "Skin.png";
            case 5 : return "Skaku.png";
            case 6 : return "Shi.png";
            case 7 : return "Sou.png";
            case 8 : return "Sto.png";
            case 9 : return "Snkyo.png";
            case 10 : return "Snkei.png";
            case 11 : return "Sngin.png";
            case 12 : return "Suma.png";
            case 13 : return "Sryu.png";
        }
    }else{
        switch(Number(koma)){
            case 0 : return "Efu.png";
            case 1 : return "Ekyo.png";
            case 2 : return "Ekei.png";
            case 3 : return "Egin.png";
            case 4 : return "Ekin.png";
            case 5 : return "Ekaku.png";
            case 6 : return "Ehi.png";
            case 7 : return "Eou.png";
            case 8 : return "Eto.png";
            case 9 : return "Enkyo.png";
            case 10 : return "Enkei.png";
            case 11 : return "Engin.png";
            case 12 : return "Euma.png";
            case 13 : return "Eryu.png";
        }
    }
}

function setHand(board){

  $("#own").children(".hand").remove();
  $("#enemy").children(".hand").remove();

  for (let piece in board) {
    if(piece > game.HOLD) {
      if(board[piece].isOwn) {
        let koma = (piece > (game.HOLD + game.GOTE)) ? piece - (game.HOLD + game.GOTE) : piece - (game.HOLD + game.SENTE);
        let komaImg = getKomaImg(koma,true);
        $("#own").append("<div class='hand square isOwn' id='"+ board[piece].position +"' name='"+ koma +"' tap='0'><img src='/images/pieces/"+komaImg+"' height='100%'></div>");
      } else {
        let koma = (piece > (game.HOLD + game.GOTE)) ? piece - (game.HOLD + game.GOTE) : piece - (game.HOLD + game.SENTE);
        let komaImg = getKomaImg(koma,false);
        $("#enemy").append("<div class='hand square isEnemy' id='"+ board[piece].position +"' name='"+ koma +"' tap='0'><img src='/images/pieces/"+komaImg+"' height='100%'></div>");
      }
    }
  }
}

function convertBoard(board){
  let result = {};
  for (let piece in board) {
    if(piece > game.HOLD){
      result[piece] = board[piece].koma;
    } else {
      if(board[piece].isSente) {
        result[piece] = board[piece].koma + 100;
      }else{
        result[piece] = board[piece].koma + 200;
      }
    }
  }
  return result;
}