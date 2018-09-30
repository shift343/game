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
            piece = !board[piece].isHold ? board[piece].setMoveArea(board) : !is_null(board[piece].koma) ? board[piece].setShotArea(board) : piece;
        }
        return board;
    }

    // 移動可能範囲から合法手を生成
    extractLegalArea(board,game){

        // 一時的に上書き用のクラスを作る
        let tempBoard = new Board(board.convertBoard(board),game);

        for (let piece in board) {
            if(board[piece].isOwn && !board[piece].isHold){
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
                    let isCheck = tempBoard.isCheck(tempBoard.showMoveArea(tempBoard));
                    if(isCheck["isOwn"]){
                        delete extractLegalMoveArea[movePos];
                    }
                    // 移動元を戻す
                    tempBoard[beforePiece.position] = beforePiece;
                    // 移動先を巻き戻し
                    tempBoard[afterPiece.position] = reversePiece;
                }
                board[piece].moveArea = extractLegalMoveArea;
            }else if(board[piece].isOwn && board[piece].isHold){

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
            if(board[piece].isOwn && board[piece].moveArea.length > 0){
                isCheckMate["isOwn"] = false;
            }else if(!board[piece].isOwn && board[piece].moveArea.length > 0){
                isCheckMate["isEnemy"] = false;
            }
        }
        return isCheckMate;
    }

}