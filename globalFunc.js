global.GlobalFunc = {
    // 先手駒か
    isSente : (koma) =>{
        return (koma >= GlobalVar.SENTE && koma < GlobalVar.GOTE) ? true : false;
    },
    // 後手駒か
    isGote : (koma) =>{
        return (koma >= GlobalVar.GOTE && koma < GlobalVar.HOLD) ? true : false;
    },
    // 先手持ち駒か
    isSenteHold : (pos) =>{
        return (pos >= GlobalVar.HOLD + GlobalVar.SENTE && pos < GlobalVar.HOLD + GlobalVar.GOTE) ? true : false;
    },
    // 後手持ち駒か
    isGoteHold : (pos) =>{
        return (pos >= GlobalVar.HOLD + GlobalVar.GOTE) ? true : false;
    },
    // 駒があるマスかどうか
    isPiece : (piece) => {
        return piece.isOwn != undefined ? true : false;
    }

}
module.exports = GlobalFunc;