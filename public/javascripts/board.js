class Board {

    constructor(ownData,matchingData,board,isOwn){
        if(board == null || board == undefined) {
            this.init(ownData,matchingData);
        } else {
            this.reCreateBoard(board,isOwn);
        }
    }

    init(ownData,matchingData){

        let InitPlace = {
            91:201,81:202,71:203,61:204,51:207,41:204,31:203,21:202,11:201,
            82:206,22:205,
            93:200,83:200,73:200,63:200,53:200,43:200,33:200,23:200,13:200,

            97:100,87:100,77:100,67:100,57:100,47:100,37:100,27:100,17:100,
            28:106,88:105,
            99:101,89:102,79:103,69:104,59:107,49:104,39:103,29:102,19:101
        };
        
        // 駒のインスタンスを生成
        for (let pos in InitPlace) {
            if (InitPlace[pos] >= game.GOTE) {
                var koma = InitPlace[pos] - game.GOTE;
                var position = pos;
                var isSente = false;
                var isOwn = (matchingData.gote == ownData.id) ? true: false;
                var isHold = (position > 1000) ? true : false;
                var isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);
            }else{
                var koma = InitPlace[pos] - game.SENTE;
                var position = pos;
                var isSente = true;
                var isOwn = (matchingData.sente == ownData.id) ? true: false;
                var isHold = (position > 1000) ? true : false;
                var isEvolve = false;
                this[pos] = new Piece(koma,position,isSente,isOwn,isHold,isEvolve);
            }
        };

        this.showMoveArea(this);
        //this.extractLegalArea(this.showMoveArea(this));
    }

    // 盤面の更新
    updateBoard(komaInfo,isOwn) {

        this[komaInfo.toPos] = new Piece(komaInfo.koma,komaInfo.toPos,komaInfo.isSente,isOwn);
        delete this[komaInfo.fromPos];

    }

    // 盤面再生成
    reCreateBoard(board,isOwn){

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

    // 盤面を軽い配列に変換
    convertBoard(board) {
        // board情報を基にインスタンスを再生成
        // for (let piece in board) {
        //     var koma = board[piece].koma;
        //     var position = board[piece].position;
        //     var isSente = board[piece].isSente;
        //     var isHold = board[piece].isHold;
        //     var isEvolve = board[piece].isEvolve;
        //     if(board[piece].isOwn == isOwn){
        //         this[piece]   = new Piece(koma,position,isSente,true,isHold,isEvolve);
        //     }else{
        //         this[piece]   = new Piece(koma,position,isSente,false,isHold,isEvolve);
        //     }
        // };

        console.log(board);
    }


}