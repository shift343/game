class Piece {
    constructor(koma,position,isSente,isOwn,isHold,isEvolve){

        this.koma     = koma;
        this.position = parseInt(position);
        this.isSente  = isSente;
        this.isOwn    = isOwn;
        this.isHold   = isHold;
        this.isEvolve = isEvolve;        

        this.isHu  = koma == game.HU ? true  : false;
        this.isKy  = koma == game.KY ? true  : false;
        this.isKe  = koma == game.KE ? true  : false;
        this.isGi  = koma == game.GI ? true  : false;
        this.isKi  = koma == game.KI ? true  : false;
        this.isKa  = koma == game.KA ? true  : false;
        this.isHi  = koma == game.HI ? true  : false;
        this.isOu  = koma == game.OU ? true  : false;
        this.isNhu = koma == game.NHU ? true : false;
        this.isNky = koma == game.NKY ? true : false;
        this.isNke = koma == game.NKE ? true : false;
        this.isNgi = koma == game.NGI ? true : false;
        this.isNka = koma == game.NKA ? true : false;
        this.isNhi = koma == game.NHI ? true : false;

        this.moveArea = [];

        if(isEvolve) {
            this.setEvolve();
        }
    }

    // 駒成り
    setEvolve(){

        switch( this.koma ) {
            case game.HU:
                this.koma  = game.NHU;
                this.isHu  = false;
                this.isNhu = true;
                break;
         
            case game.KY:
                this.koma  = game.NKY;
                this.isKy  = false;
                this.isNky = true;
                break;
         
            case game.KE:
                this.koma  = game.NKE;
                this.isKe  = false;
                this.isNke = true;
                break;

            case game.GI:
                this.koma  = game.NGI;
                this.isGi  = false;
                this.isNgi = true;                
                break;
         
            case game.KA:
                this.koma  = game.NKA;
                this.isKa  = false;
                this.isNka = true;
                break;

            case game.HI:
                this.koma  = game.NHI;
                this.isHi  = false;
                this.isNhi = true;
                break;
        }
    }

    // 駒取り
    setHold(){
        this.isHold = true;
        this.isOwn  = this.isOwn ? false : true;
        this.isSente = this.isSente ? false : true;

        if(this.isEvolve) {
            switch( this.koma ) {
                case game.NHU:
                    this.koma  = game.HU;
                    this.isHu  = true;
                    this.isNhu = false;
                    this.isEvolve = false;
                    break;
             
                case game.NKY:
                    this.koma  = game.KY;
                    this.isKy  = true;
                    this.isNky = false;
                    this.isEvolve = false;
                    break;
             
                case game.NKE:
                    this.koma  = game.KE;
                    this.isKe  = true;
                    this.isNke = false;
                    this.isEvolve = false;
                    break;
    
                case game.NGI:
                    this.koma  = game.GI;
                    this.isGi  = true;
                    this.isNgi = false;
                    this.isEvolve = false;
                    break;
             
                case game.NKA:
                    this.koma  = game.KA;
                    this.isKa  = true;
                    this.isNka = false;
                    this.isEvolve = false;
                    break;
    
                case game.NHI:
                    this.koma  = game.HI;
                    this.isHi  = true;
                    this.isNhi = false;
                    this.isEvolve = false;

                    break;
            }

        }
    }

    // 移動可能範囲生成
    setMoveArea(board){

        const Direction = [];

        Direction[0]  =  10;   //←
        Direction[1]  =  11;   //←↓
        Direction[2]  =   1;   //↓
        Direction[3]  =  -9;   //→↓
        Direction[4]  = -10;   //→
        Direction[5]  = -11;   //→↑
        Direction[6]  =  -1;   //↑
        Direction[7]  =   9;   //←↑
        Direction[8]  = -12;   //桂馬右飛び
        Direction[9]  =   8;   //桂馬左飛び

        /* 歩香桂銀金角飛玉と杏圭全馬竜 (Direction順) */
        const CanGo = [
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1],
            [0,0,0,1,0,1,0,1,0,0,0,0,1,1],
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1],
            [0,0,0,1,0,1,0,1,0,0,0,0,1,1],
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1],
            [0,0,0,1,1,1,0,1,1,1,1,1,1,1],
            [1,1,0,1,1,0,1,1,1,1,1,1,1,1],
            [0,0,0,1,1,1,0,1,1,1,1,1,1,1],
            [0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0,0,0,0,0,0,0]
        ];

        /* 歩香桂銀金角飛玉と杏圭全馬竜 (Direction順) */
        const CanJump = [
            [0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [0,0,0,0,0,1,0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [0,0,0,0,0,1,0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [0,0,0,0,0,1,0,0,0,0,0,0,1,0],
            [0,1,0,0,0,0,1,0,0,0,0,0,0,1],
            [0,0,0,0,0,1,0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];


        // 後手だったらDirectionの中身に-1をかける 
        if (!this.isSente) {
            Direction.forEach(function(val, key){
                Direction[key] = val * -1;
            });
        }

        // 移動可能範囲初期化
        let result = [];

        // 移動先初期化
        let movePos = null;

        // 自駒の移動可能範囲
        if (this.isOwn) {
            // 全移動方向に対して行けるか行けないか判断 
            for (var i = 0; i < 10; i++) {
                // もしも[i]の方向に移動可能な駒であれば 
                if (CanGo[i][this.koma]) {
                    // 移動先のマスを配列に追加 
                    movePos = this.position + Direction[i];
                    // ①移動先に自駒がない ②移動禁止エリアに入っていない
                    if ((is_empty(board[movePos]) || (!is_empty(board[movePos]) && board[movePos].isOwn == false)) && !game.Guardian.includes(movePos)) {
                        result.push(movePos);
                        // もしも[i]の方向にジャンプ可能な駒であれば
                        if (CanJump[i][this.koma]) {
                            for (var j = 1; j <= 8; j++) {
                                // ①移動先に駒があったら
                                if (!is_empty(board[movePos])) {
                                    break;
                                }
                                movePos = this.position + Direction[i];
                                movePos = movePos + Direction[i] * j;
                                // ①移動先に自駒がある ②移動禁止エリアに入っている
                                if((!is_empty(board[movePos]) && board[movePos].isOwn == true) || game.Guardian.includes(movePos)){
                                    break;
                                }else{
                                    result.push(movePos);
                                    // ①移動先に駒があったら 
                                    if (!is_empty(board[movePos])) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // 敵駒の移動可能範囲
        else {
            // 全移動方向に対して行けるか行けないか判断 
            for (var i = 0; i < 10; i++) {
                // もしも[i]の方向に移動可能な駒であれば 
                if (CanGo[i][this.koma]) {
                    // 移動先のマスを配列に追加
                    movePos = this.position + Direction[i];
                    // ①移動先に自駒がない ②移動禁止エリアに入っていない
                    if ((is_empty(board[movePos]) || (!is_empty(board[movePos]) && board[movePos].isOwn == true)) && !game.Guardian.includes(movePos)) {
                        result.push(movePos);
                        // もしも[i]の方向にジャンプ可能な駒であれば
                        if (CanJump[i][this.koma]) {
                            for (var j = 1; j <= 8; j++) {
                                // ①移動先に駒があったら
                                if (!is_empty(board[movePos])) {
                                    break;
                                }
                                movePos = this.position + Direction[i];
                                movePos = movePos + Direction[i] * j;
                                // ①移動先に自駒がある ②移動禁止エリアに入っている
                                if((!is_empty(board[movePos]) && board[movePos].isOwn == false) || game.Guardian.includes(movePos)){
                                    break;
                                }else{
                                    result.push(movePos);
                                    // ①移動先に駒があったら 
                                    if (!is_empty(board[movePos])) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.moveArea = result;
    }

}