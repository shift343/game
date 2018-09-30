export default class Board {

    // 盤面配列を渡して盤面クラス生成
    constructor(board,game){
        this.setBoard(board,game);
    }

    // 盤面生成
    setBoard(board,game){

        // 駒のインスタンスを生成
        for (let pos in board) {

            // 先手駒
            if(GlobalFunc.isSente(board[pos])){
                let koma = board[pos] - GlobalVar.SENTE;
                let position = pos;
                let isSente = true;
                let isOwn = (game.sente == game.ownId) ? true: false;
                let isHold = false;
                let isEvolve = koma >= GlobalVar.NHU ? true : false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 後手駒
            }else if(GlobalFunc.isGote(board[pos])){
                let koma = board[pos] - GlobalVar.GOTE;
                let position = pos;
                let isSente = false;
                let isOwn = (game.gote == game.ownId) ? true: false;
                let isHold = false;
                let isEvolve = koma >= GlobalVar.NHU ? true : false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 先手持ち駒
            }else if(GlobalFunc.isSenteHold(pos)){
                let koma = board[pos];
                let position = pos;
                let isSente = true;
                let isOwn = (game.sente == game.ownId) ? true: false;
                let isHold = true;
                let isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 後手持ち駒
            }else if(GlobalFunc.isGoteHold(pos)){
                let koma = board[pos];
                let position = pos;
                let isSente = false;
                let isOwn = (game.gote == game.ownId) ? true: false;
                let isHold = true;
                let isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 駒のないマス
            }else{
                this[pos] = new Piece(null,pos,false,false,false,false);

            }
        };
        this.showMoveArea(this);

    }

    // 単純な盤面配列に変換
    convertBoard(board){
        let result = {};
        for (let piece in board) {
            if(is_null(board[piece].koma)){
                result[piece] = null;
            }else if(piece > GlobalVar.HOLD){
                result[piece] = board[piece].koma;
            } else {
                if(board[piece].isSente) {
                    result[piece] = board[piece].koma + GlobalVar.SENTE;
                }else{
                    result[piece] = board[piece].koma + GlobalVar.GOTE;
                }
            }
        }
        return result;
    }

    // 移動可能範囲生成
    showMoveArea(board){
        for (let piece in board) {
            piece = !board[piece].isHold ? board[piece].setMoveArea(board) : !is_empty(board[piece].koma) ? board[piece].setShotArea(board) : piece;
        }
        return board;
    }

    // 移動可能範囲から合法手を生成
    extractLegalArea(board,game){

        // 一時的に上書き用のクラスを作る
        let tempBoard = new Board(board.convertBoard(board),game);

        for (let piece in board) {
            if(board[piece].isOwn){
                // 最終的な合法手
                let extractLegalMoveArea = board[piece].moveArea;
                // 移動元の駒を複製
                let beforePiece = new Piece(board[piece].koma,board[piece].position,board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);
                // 一手一手進めた駒で盤面を判断していく
                for(let movePos in extractLegalMoveArea) {
                    // 移動先の駒を生成
                    let afterPiece  = new Piece(board[piece].koma,extractLegalMoveArea[movePos],board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);
                    // 移動先巻き戻し用の駒を複製
                    let reversePiece = is_null(board[extractLegalMoveArea[movePos]].koma) ? new Piece(null,extractLegalMoveArea[movePos],false,false,false,false) : board[extractLegalMoveArea[movePos]];
                    // 移動先を上書き
                    tempBoard[extractLegalMoveArea[movePos]] = afterPiece;
                    // 移動元を初期化
                    tempBoard[board[piece].position] = new Piece(null,board[piece].position,false,false,false,false);
                    // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                    let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
                    if(isCheck){
                        delete extractLegalMoveArea[movePos];
                    } 
                    // 移動元を戻す
                    tempBoard[beforePiece.position] = beforePiece;
                    // 移動先を巻き戻し
                    tempBoard[afterPiece.position] = reversePiece;
                }
                board[piece].moveArea = extractLegalMoveArea;
            }
        }
    }

    // // 移動可能範囲から合法手を生成
    // extractLegalArea(board){

    //     // 一時的に上書き用のクラスを作る
    //     // let tempBoard = new Board(board,false);

    //     for (let piece in board) {
    //         if(board[piece].isOwn && !board[piece].isHold) {
    //             // 最終的な合法手
    //             let extractLegalMoveArea = board[piece].moveArea;
    //             // 移動元の駒
    //             let beforePiece = new Piece(board[piece].koma,board[piece].position,board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);

    //             // 一手一手進めた駒で盤面を判断していく
    //             for(let movePos in extractLegalMoveArea) {

    //                 let reversePiece = null;
    //                 let afterPiece  = new Piece(board[piece].koma,extractLegalMoveArea[movePos],board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);
    //                 if(board[extractLegalMoveArea[movePos]] != undefined){
    //                     reversePiece = board[extractLegalMoveArea[movePos]];
    //                 }

    //                 // 移動先を生成
    //                 tempBoard[extractLegalMoveArea[movePos]] = afterPiece;
    //                 // 移動元を削除
    //                 delete tempBoard[piece];

    //                 // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
    //                 let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
    //                 if(isCheck){
    //                     delete extractLegalMoveArea[movePos];
    //                 }

    //                 // 移動元を戻す
    //                 tempBoard[beforePiece.position] = beforePiece;
    //                 // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
    //                 if(reversePiece != null){
    //                     tempBoard[afterPiece.position] = reversePiece;
    //                 } else {
    //                     delete tempBoard[afterPiece.position];
    //                 }
    //             }
    //             board[piece].moveArea = extractLegalMoveArea;

    //         } else if(board[piece].isOwn && board[piece].isHold) {

    //             // 最終的な合法手
    //             let extractLegalShotArea = board[piece].moveArea;
    //             // 移動元の駒
    //             let beforePiece = new Piece(board[piece].koma,board[piece].position,board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);

    //             switch( board[piece].koma ) {
    //                 case game.HU:
    //                     if(is_empty(legalShotArea_hu)){

    //                         // 一手一手進めた駒で盤面を判断していく
    //                         for(let movePos in extractLegalShotArea) {

    //                             let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

    //                             // 移動先を生成
    //                             tempBoard[extractLegalShotArea[movePos]] = afterPiece;
    //                             // 移動元を削除
    //                             delete tempBoard[piece];

    //                             // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
    //                             let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
    //                             if(isCheck){
    //                                 delete extractLegalShotArea[movePos];
    //                             }

    //                             // 移動元を戻す
    //                             tempBoard[beforePiece.position] = beforePiece;
    //                             // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
    //                             delete tempBoard[afterPiece.position];
    //                         }

    //                         legalShotArea_hu = extractLegalShotArea;
    //                     } else {
    //                         extractLegalShotArea = legalShotArea_hu;
    //                     }
    //                     break;
                    
    //                 case game.KY:
    //                     if(is_empty(legalShotArea_ky)){

    //                         // 一手一手進めた駒で盤面を判断していく
    //                         for(let movePos in extractLegalShotArea) {

    //                             let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

    //                             // 移動先を生成
    //                             tempBoard[extractLegalShotArea[movePos]] = afterPiece;
    //                             // 移動元を削除
    //                             delete tempBoard[piece];

    //                             // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
    //                             let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
    //                             if(isCheck){
    //                                 delete extractLegalShotArea[movePos];
    //                             }

    //                             // 移動元を戻す
    //                             tempBoard[beforePiece.position] = beforePiece;
    //                             // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
    //                             delete tempBoard[afterPiece.position];
    //                         }

    //                         legalShotArea_ky = extractLegalShotArea;
    //                     } else {
    //                         extractLegalShotArea = legalShotArea_ky;
    //                     }
    //                     break;
                    
    //                 case game.KE:
    //                     if(is_empty(legalShotArea_ke)){

    //                         // 一手一手進めた駒で盤面を判断していく
    //                         for(let movePos in extractLegalShotArea) {

    //                             let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

    //                             // 移動先を生成
    //                             tempBoard[extractLegalShotArea[movePos]] = afterPiece;
    //                             // 移動元を削除
    //                             delete tempBoard[piece];

    //                             // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
    //                             let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
    //                             if(isCheck){
    //                                 delete extractLegalShotArea[movePos];
    //                             }

    //                             // 移動元を戻す
    //                             tempBoard[beforePiece.position] = beforePiece;
    //                             // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
    //                             delete tempBoard[afterPiece.position];
    //                         }

    //                         legalShotArea_ke = extractLegalShotArea;
    //                     } else {
    //                         extractLegalShotArea = legalShotArea_ke;
    //                     }
    //                     break;
        
    //                 default:
    //                     if(is_empty(legalShotArea_other)){

    //                         // 一手一手進めた駒で盤面を判断していく
    //                         for(let movePos in extractLegalShotArea) {

    //                             let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

    //                             // 移動先を生成
    //                             tempBoard[extractLegalShotArea[movePos]] = afterPiece;
    //                             // 移動元を削除
    //                             delete tempBoard[piece];

    //                             // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
    //                             let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
    //                             if(isCheck){
    //                                 delete extractLegalShotArea[movePos];
    //                             }

    //                             // 移動元を戻す
    //                             tempBoard[beforePiece.position] = beforePiece;
    //                             // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
    //                             delete tempBoard[afterPiece.position];
    //                         }

    //                         legalShotArea_other = extractLegalShotArea;
    //                     } else {
    //                         extractLegalShotArea = legalShotArea_other;
    //                     }
    //                     break;
    //             }
    //             board[piece].moveArea = extractLegalShotArea; 

    //         }
    //     }
    // }

    // 自王の位置を取得
    getKingPosition(board){
        let king;
        for (let piece in board) {
            if(board[piece].isOu && board[piece].isOwn) {
                king = board[piece].position;
            }
        }
        return king;
    }

    // 王手を掛けられている状態かチェック
    getCheckStatus(board){
        let king = board.getKingPosition(board);
        let check = false;
        for (let piece in board) {
            if(in_array(king,board[piece].moveArea)) {
                check = true;
                break;
            }
        }
        return check;
    }
    
    //自玉or相手玉が詰んでいるか判定
    isCheckMate(board){
        let isCheckMate = {"isOwn":false,"isEnemy":false};
        
        for (let piece in board) {
            if(board[piece].isOwn && board[piece].moveArea.length > 0){
                isCheckMate["isOwn"] = true;
                break;
            }else if(!board[piece].isOwn && board[piece].moveArea.length > 0){
                isCheckMate["isEnemy"] = true;
                break;
            }
        }
        return isCheckMate;
    }
    

}