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
        return piece.koma != null ? true : false;
    },
    // 盤面を更新する
    UpdateBoard : (board,koma,moveFrom,moveTo,isEvolve,isShot) => {
        if(isEvolve) {
            koma = GlobalVar.EVOLVE[koma];
        }
        if(isShot){
            koma = moveFrom - GlobalVar.HOLD;
        }
        if(board[moveTo]) {
            let holdKoma = GlobalVar.REVERSE[board[moveTo]];
            let key = holdKoma + GlobalVar.HOLD;
            board[key] = board[key] ? board[key]+1 : 1;
        }

        board[moveFrom] = (isShot) ? board[moveFrom]-1 : null;
        board[moveTo] = koma;
        return board;
    },
}
module.exports = GlobalFunc;