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
    showMoveArea(board,isOwn){
        if(isOwn == undefined){
            for (let piece in board) {
                if(!is_null(board[piece].koma) && !board[piece].isHold){
                    board[piece].setMoveArea(board);
                }else if(!is_null(board[piece].koma)){
                    board[piece].setShotArea(board);
                }
            }
        }else if(isOwn){
            for (let piece in board) {
                if(!is_null(board[piece].koma) && !board[piece].isHold && board[piece].isOwn){
                    board[piece].setMoveArea(board);
                }else if(!is_null(board[piece].koma) && board[piece].isOwn){
                    board[piece].setShotArea(board);
                }
            }
        }else if(!isOwn){
            for (let piece in board) {
                if(!is_null(board[piece].koma) && !board[piece].isHold && !board[piece].isOwn){
                    board[piece].setMoveArea(board);
                }else if(!is_null(board[piece].koma) && !board[piece].isOwn){
                    board[piece].setShotArea(board);
                }
            }
        }
        return board;
    }

    // 合法手を生成
    extractLegalArea(game){

        // 移動可能範囲生成
        this.showMoveArea(this);
        // 一時的に上書き用のクラスを作る
        let tempBoard = new Board(this.convertBoard(this),game);

        // 合法手生成
        for (let piece in this) {
            if(!is_null(this[piece].koma) && !this[piece].isHold){
                // 移動可能範囲
                let extractLegalMoveArea = this[piece].moveArea;
                // 移動元の駒を複製
                let beforePiece = new Piece(this[piece].koma,this[piece].position,this[piece].isSente,this[piece].isOwn,this[piece].isHold,this[piece].isEvolve);
                // 一手一手進めた駒で盤面を判断していく
                for(let movePos in extractLegalMoveArea) {
                    // 移動先の駒を生成
                    let afterPiece  = new Piece(this[piece].koma,extractLegalMoveArea[movePos],this[piece].isSente,this[piece].isOwn,this[piece].isHold,this[piece].isEvolve);
                    // 移動先巻き戻し用の駒を複製
                    let reversePiece = is_null(this[extractLegalMoveArea[movePos]].koma) ? new Piece(null,extractLegalMoveArea[movePos],false,false,false,false) : this[extractLegalMoveArea[movePos]];
                    // 移動先を上書き
                    tempBoard[extractLegalMoveArea[movePos]] = afterPiece;
                    // 移動元を初期化
                    tempBoard[this[piece].position] = new Piece(null,this[piece].position,false,false,false,false);
                    // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                    let isCheck = tempBoard.isCheck(tempBoard.showMoveArea(tempBoard));
                    if((this[piece].isOwn && isCheck["isOwn"]) || (!this[piece].isOwn && isCheck["isEnemy"])){
                        delete extractLegalMoveArea[movePos];
                    }
                    // 移動元を戻す
                    tempBoard[beforePiece.position] = beforePiece;
                    // 移動先を巻き戻し
                    tempBoard[afterPiece.position] = reversePiece;
                }
                // 最終的な合法手をセット
                this[piece].moveArea = extractLegalMoveArea;
            // 駒打ち用の合法手をセット
            }else if(!is_null(this[piece].koma) && this[piece].isHold){

                if(this[piece].koma == 0){
                    // 合法手を空に
                    this[piece].moveArea = [];
                }else{
                    // 移動可能範囲
                    let extractLegalShotArea = this[piece].moveArea;

                    // 一手一手進めた駒で盤面を判断していく
                    for(let movePos in extractLegalShotArea) {
                        // 移動先の駒を生成
                        let afterPiece  = new Piece(this[piece].koma,extractLegalShotArea[movePos],this[piece].isSente,this[piece].isOwn,this[piece].isHold,this[piece].isEvolve);
                        // 移動先を上書き
                        tempBoard[extractLegalShotArea[movePos]] = afterPiece;
                        // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                        let isCheck = tempBoard.isCheck(tempBoard.showMoveArea(tempBoard));
                        if((this[piece].isOwn && isCheck["isOwn"]) || (!this[piece].isOwn && isCheck["isEnemy"])){
                            delete extractLegalShotArea[movePos];
                        }
                        // 移動先を巻き戻し
                        tempBoard[afterPiece.position] = new Piece(null,extractLegalShotArea[movePos],false,false,false,false);
                    }
                    // 最終的な合法手をセット
                    this[piece].moveArea = extractLegalShotArea;

                }




                // 手駒の合法手生成
                // for (let i=0; i < shotArea["isOwn"].moveArea.length; i=i+1) {
                //     // 移動先を上書き
                //     tempBoard[shotArea[i]] = new Piece(3,shotArea[i],isSente,isOwn,false,false);
                //     // 相手の移動先を生成
                //     for (let tempPiece in tempBoard) {
                //         if(!is_null(tempBoard[tempPiece].koma) && !tempBoard[tempPiece].isHold && !isOwn){
                //             if(tempBoard[tempPiece].isKy || tempBoard[tempPiece].isKa || tempBoard[tempPiece].isHi || tempBoard[tempPiece].isNka || tempBoard[tempPiece].isNhi){
                //                 tempBoard[tempPiece].setMoveArea(tempBoard);
                //             }else{
                //                 tempBoard[tempPiece].moveArea = [];
                //             }
                //         }
                //     }
                //     // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                //     let isCheck = tempBoard.isCheck(tempBoard);
                //     if(isCheck[isOwnStr]){
                //         delete shotArea[i];
                //     }
                //     // 移動先を巻き戻し
                //     tempBoard[shotArea[i]] = new Piece(null,shotArea[i],false,false,false,false);
                // }
        /*---------------------------------------------------------------*/


                // for(let i = 0; i < this[piece].moveArea.length; i=i+1){
                //     if(!in_array(this[piece].moveArea[i],shotArea)){
                //         delete this[piece].moveArea[i];
                //     }
                // }
            }
        }
    }

    // 自王の位置を取得
    getKingPosition(board){
        let king = {"isOwn":null,"isEnemy":null};
        for (let piece in board) {
            if(board[piece].isOu && board[piece].isOwn) {
                king["isOwn"] = board[piece].position;
            }else if(board[piece].isOu && !board[piece].isOwn){
                king["isEnemy"] = board[piece].position;
            }
        }
        return king;
    }

    // 自玉or相手玉が王手を掛けられているか判定
    isCheck(board){
        let king = board.getKingPosition(board);
        let isCheck = {"isOwn":false,"isEnemy":false};
        for (let piece in board) {
            if(in_array(king["isOwn"],board[piece].moveArea)) {
                isCheck["isOwn"] = true;
            }else if(in_array(king["isEnemy"],board[piece].moveArea)){
                isCheck["isEnemy"] = true;
            }
        }
        return isCheck;
    }
    
    //自玉or相手玉が詰んでいるか判定
    isCheckMate(board){
        let isCheckMate = {"isOwn":true,"isEnemy":true};
        for (let piece in board) {
            if(board[piece].isOwn && board[piece].moveArea[0]){
                isCheckMate["isOwn"] = false;
            }else if(!board[piece].isOwn && board[piece].moveArea[0]){
                isCheckMate["isEnemy"] = false;
            }
        }
        return isCheckMate;
    }

}