class Board {

    // 盤面配列を渡すと盤面クラス生成
    constructor(ownData,matchingData,board){
        this.convertBoard(ownData,matchingData,board);
    }

    // 盤面生成
    convertBoard(ownData,matchingData,board){

        // 駒のインスタンスを生成
        for (let pos in board) {

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
    }

    // 盤面複製
    reCreateBoard(board){

        // board情報を基にインスタンスを再生成
        for (let piece in board) {
            var koma = board[piece].koma;
            var position = board[piece].position;
            var isSente = board[piece].isSente;
            var isHold = board[piece].isHold;
            var isEvolve = board[piece].isEvolve;
            if(board[piece].isOwn){
                this[piece]   = new Piece(koma,position,isSente,true,isHold,isEvolve);
            }else{
                this[piece]   = new Piece(koma,position,isSente,false,isHold,isEvolve);
            }
        };
    }

    // 盤面の更新
    updateBoard(komaInfo,isOwn) {

        this[komaInfo.toPos] = new Piece(komaInfo.koma,komaInfo.toPos,komaInfo.isSente,isOwn);
        delete this[komaInfo.fromPos];

    }

    // 移動可能範囲生成
    showMoveArea(board){

        // 2歩判定用
        let checkNihuSuji = [];
        for (let piece in board) {
            if(board[piece].isOwn && board[piece].isHu){
                checkNihuSuji.push(Math.floor(board[piece].position / 10) * 10);
            }
        }

        // 移動範囲算出の再利用
        let moveArea_hu, moveArea_ky, moveArea_ke, moveArea_other;

        for (let piece in board) {
            if(!board[piece].isHold){
                piece = board[piece].setMoveArea(board);
            }else{
                let result = [];
                switch( board[piece].koma ) {
                    case game.HU:
                        if(is_empty(moveArea_hu)){
                            for(let i = 11; i <= 99; i++) {
                                if((!game.Guardian.includes(i)) && !board[i] && !checkNihuSuji.includes(Math.floor(i / 10) * 10)) {
                                    if(board[piece].isSente) {
                                        if(!game.Dan_1st.includes(i)) {
                                            result.push(i);
                                        }
                                    }else{
                                        if(!game.Dan_9th.includes(i)) {
                                            result.push(i);
                                        }
                                    }
                                }
                            }
                            moveArea_hu = result;
                        } else {
                            result = moveArea_hu;
                        }
                        break;
                    
                    case game.KY:
                        if(is_empty(moveArea_ky)){
                            for(let i = 11; i <= 99; i++) {
                                if((!game.Guardian.includes(i)) && !board[i]) {
                                    if(board[piece].isSente) {
                                        if(game.Dan_1st.indexOf(i) < 0) {
                                            result.push(i);
                                        }
                                    }else{
                                        if(!game.Dan_9th.includes(i)) {
                                            result.push(i);
                                        }
                                    }
                                }
                            }
                            moveArea_ky = result;
                        } else {
                            result = moveArea_ky;
                        }
                        break;
                    
                    case game.KE:
                        if(is_empty(moveArea_ke)){
                            for(let i = 11; i <= 99; i++) {
                                if((!game.Guardian.includes(i)) && !board[i]) {
                                    if(board[piece].isSente) {
                                        if(!game.Dan_1st.includes(i) && !game.Dan_2nd.includes(i)) {
                                            result.push(i);
                                        }
                                    }else{
                                        if(!game.Dan_9th.includes(i) && !game.Dan_8th.includes(i)) {
                                            result.push(i);
                                        }
                                    }
                                }
                            }
                            moveArea_ke = result;
                        } else {
                            result = moveArea_ke;
                        }
                        break;
        
                    default:
                        if(is_empty(moveArea_other)){                        
                            for(let i = 11; i <= 99; i++) {
                                if((!game.Guardian.includes(i)) && !board[i]) {
                                    result.push(i);
                                }
                            }
                            moveArea_other = result;
                        } else {
                            result = moveArea_other;
                        }
                        break;
                }
                board[piece].moveArea = result;            
            }
        }
        return board;
    }

    // 移動可能範囲から合法手を生成
    extractLegalArea(board){

        // 一時的に上書き用のクラスを作る
        let tempBoard = new Board(board,false);

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
                    case game.HU:
                        if(is_empty(legalShotArea_hu)){

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
                    
                    case game.KY:
                        if(is_empty(legalShotArea_ky)){

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
                    
                    case game.KE:
                        if(is_empty(legalShotArea_ke)){

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
                        if(is_empty(legalShotArea_other)){

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