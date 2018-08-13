class Board {

    // 盤面配列を渡すと盤面クラス生成、渡さないと初期化
    constructor(ownData,matchingData,board,isOwn){
        board == undefined ? this.init(ownData,matchingData) : this.reCreateBoard(board,isOwn);
    }

    init(ownData,matchingData){

        let Piece = require('./piece');

        let InitPlace = {
            91:201, 81:202, 71:203, 61:204, 51:207, 41:204, 31:203, 21:202, 11:201,
            92:null,82:206, 72:null,62:null,52:null,42:null,32:null,22:205, 12:null,
            93:200, 83:200, 73:200, 63:200, 53:200, 43:200, 33:200, 23:200, 13:200,
            94:null,84:null,74:null,64:null,54:null,44:null,34:null,24:null,14:null,
            95:null,85:null,75:null,65:null,55:null,45:null,35:null,25:null,15:null,
            96:null,86:null,76:null,66:null,56:null,46:null,36:null,26:null,16:null,
            97:100, 87:100, 77:100, 67:100, 57:100, 47:100, 37:100, 27:100, 17:100,
            98:null,88:105, 78:null,68:null,58:null,48:null,38:null,28:106, 18:null,
            99:101, 89:102, 79:103, 69:104, 59:107, 49:104, 39:103, 29:102, 19:101,
            1100:0,1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,
            1200:0,1201:0,1202:0,1203:0,1204:0,1205:0,1206:0
        };
    
        // 駒のインスタンスを生成
        for (let pos in InitPlace) {

            // 先手駒
            if(GlobalFunc.isSente(InitPlace[pos])){
                let koma = InitPlace[pos] - GlobalVar.SENTE;
                let position = pos;
                let isSente = true;
                let isOwn = (matchingData.sente == ownData.id) ? true: false;
                let isHold = false;
                let isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 後手駒
            }else if(GlobalFunc.isGote(InitPlace[pos])){
                let koma = InitPlace[pos] - GlobalVar.GOTE;
                let position = pos;
                let isSente = false;
                let isOwn = (matchingData.gote == ownData.id) ? true: false;
                let isHold = false;
                let isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 先手持ち駒
            }else if(GlobalFunc.isSenteHold(pos)){
                let koma = InitPlace[pos];
                let position = pos;
                let isSente = true;
                let isOwn = (matchingData.sente == ownData.id) ? true: false;
                let isHold = true;
                let isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 後手持ち駒
            }else if(GlobalFunc.isGoteHold(pos)){
                let koma = InitPlace[pos];
                let position = pos;
                let isSente = false;
                let isOwn = (matchingData.gote == ownData.id) ? true: false;
                let isHold = true;
                let isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);

            // 駒のないマス
            }else{
                this[pos] = new Piece(null,pos,false,false,false,false);

            }
        };
        //this.showMoveArea(this);
    }

    // 盤面の更新
    updateBoard(komaInfo,isOwn) {

        let Piece = require('./piece');

        this[komaInfo.toPos] = new Piece(komaInfo.koma,komaInfo.toPos,komaInfo.isSente,isOwn);
        delete this[komaInfo.fromPos];

    }

    // 盤面再生成
    reCreateBoard(board,isOwn){

        let Piece = require('./piece');

        // board情報を基にインスタンスを再生成
        for (let piece in board) {
            var koma = board[piece].koma;
            var position = board[piece].position;
            var isSente = board[piece].isSente;
            var isHold = board[piece].isHold;
            var isEvolve = board[piece].isEvolve;
            if(board[piece].isOwn == isOwn){
                this[piece]   = new Piece(koma,position,isSente,true,isHold,isEvolve);
            }else{
                this[piece]   = new Piece(koma,position,isSente,false,isHold,isEvolve);
            }
        };
    }

    // 移動可能範囲生成
    showMoveArea(board){
        for (let piece in board) {
            piece = !board[piece].isHold ? board[piece].setMoveArea(board) : !is_empty(board[piece].koma) ? board[piece].setShotArea(board):piece;
        }
        return board;
    }

    // 移動可能範囲から合法手を生成
    extractLegalArea(board){

        let Piece = require('./piece');
        let common = require('../commonFunc');
        let global = require('../global');

        // 一時的に上書き用のクラスを作る
        let tempBoard = new Board(null,null,board,true);

        // 駒打ちの場合は合法手算出を再利用する
        let legalShotArea_hu, legalShotArea_ky, legalShotArea_ke, legalShotArea_other;

        for (let piece in board) {
            if(board[piece].isOwn && !board[piece].isHold) {
                // 最終的な合法手
                let extractLegalMoveArea = board[piece].moveArea;
                // 移動元の駒
                let beforePiece = new Piece(board[piece].koma,board[piece].position,board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);

                // 一手一手進めた駒で盤面を判断していく
                for(let movePos in extractLegalMoveArea) {

                    let reversePiece = null;
                    let afterPiece  = new Piece(board[piece].koma,extractLegalMoveArea[movePos],board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);
                    if(board[extractLegalMoveArea[movePos]] != undefined){
                        reversePiece = board[extractLegalMoveArea[movePos]];
                    }

                    // 移動先を生成
                    tempBoard[extractLegalMoveArea[movePos]] = afterPiece;
                    // 移動元を削除
                    delete tempBoard[piece];

                    // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                    let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
                    if(isCheck){
                        delete extractLegalMoveArea[movePos];
                    }

                    // 移動元を戻す
                    tempBoard[beforePiece.position] = beforePiece;
                    // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
                    if(reversePiece != null){
                        tempBoard[afterPiece.position] = reversePiece;
                    } else {
                        delete tempBoard[afterPiece.position];
                    }
                }
                board[piece].moveArea = extractLegalMoveArea;

            } else if(board[piece].isOwn && board[piece].isHold) {

                // 最終的な合法手
                let extractLegalShotArea = board[piece].moveArea;
                // 移動元の駒
                let beforePiece = new Piece(board[piece].koma,board[piece].position,board[piece].isSente,true,board[piece].isHold,board[piece].isEvolve);

                switch( board[piece].koma ) {
                    case global.rule.HU:
                        if(common.is_empty(legalShotArea_hu)){

                            // 一手一手進めた駒で盤面を判断していく
                            for(let movePos in extractLegalShotArea) {

                                let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

                                // 移動先を生成
                                tempBoard[extractLegalShotArea[movePos]] = afterPiece;
                                // 移動元を削除
                                delete tempBoard[piece];

                                // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                                let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
                                if(isCheck){
                                    delete extractLegalShotArea[movePos];
                                }

                                // 移動元を戻す
                                tempBoard[beforePiece.position] = beforePiece;
                                // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
                                delete tempBoard[afterPiece.position];
                            }

                            legalShotArea_hu = extractLegalShotArea;
                        } else {
                            extractLegalShotArea = legalShotArea_hu;
                        }
                        break;
                    
                    case global.rule.KY:
                        if(common.is_empty(legalShotArea_ky)){

                            // 一手一手進めた駒で盤面を判断していく
                            for(let movePos in extractLegalShotArea) {

                                let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

                                // 移動先を生成
                                tempBoard[extractLegalShotArea[movePos]] = afterPiece;
                                // 移動元を削除
                                delete tempBoard[piece];

                                // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                                let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
                                if(isCheck){
                                    delete extractLegalShotArea[movePos];
                                }

                                // 移動元を戻す
                                tempBoard[beforePiece.position] = beforePiece;
                                // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
                                delete tempBoard[afterPiece.position];
                            }

                            legalShotArea_ky = extractLegalShotArea;
                        } else {
                            extractLegalShotArea = legalShotArea_ky;
                        }
                        break;
                    
                    case global.rule.KE:
                        if(common.is_empty(legalShotArea_ke)){

                            // 一手一手進めた駒で盤面を判断していく
                            for(let movePos in extractLegalShotArea) {

                                let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

                                // 移動先を生成
                                tempBoard[extractLegalShotArea[movePos]] = afterPiece;
                                // 移動元を削除
                                delete tempBoard[piece];

                                // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                                let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
                                if(isCheck){
                                    delete extractLegalShotArea[movePos];
                                }

                                // 移動元を戻す
                                tempBoard[beforePiece.position] = beforePiece;
                                // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
                                delete tempBoard[afterPiece.position];
                            }

                            legalShotArea_ke = extractLegalShotArea;
                        } else {
                            extractLegalShotArea = legalShotArea_ke;
                        }
                        break;
        
                    default:
                        if(common.is_empty(legalShotArea_other)){

                            // 一手一手進めた駒で盤面を判断していく
                            for(let movePos in extractLegalShotArea) {

                                let afterPiece  = new Piece(board[piece].koma,extractLegalShotArea[movePos],board[piece].isSente,true,false,false);

                                // 移動先を生成
                                tempBoard[extractLegalShotArea[movePos]] = afterPiece;
                                // 移動元を削除
                                delete tempBoard[piece];

                                // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                                let isCheck = tempBoard.getCheckStatus(tempBoard.showMoveArea(tempBoard));
                                if(isCheck){
                                    delete extractLegalShotArea[movePos];
                                }

                                // 移動元を戻す
                                tempBoard[beforePiece.position] = beforePiece;
                                // 移動先削除 or 移動先に元々駒があった場合は巻き戻し
                                delete tempBoard[afterPiece.position];
                            }

                            legalShotArea_other = extractLegalShotArea;
                        } else {
                            extractLegalShotArea = legalShotArea_other;
                        }
                        break;
                }
                board[piece].moveArea = extractLegalShotArea; 

            }
        }
    }

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
        let king = this.getKingPosition(board);
        let check = false;
        for (let piece in board) {
            if(board[piece].moveArea.indexOf(king) != -1) {
                check = true;
                break;
            }
        }
        return check;
    }


}
module.exports = Board;