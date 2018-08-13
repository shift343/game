class Piece {
    constructor(koma,position,isSente,isOwn,isHold,isEvolve){

        this.koma     = koma;
        this.position = parseInt(position);
        this.isSente  = isSente;
        this.isOwn    = isOwn;
        this.isHold   = isHold;
        this.isEvolve = isEvolve;
        this.isHu     = isHold ? false : koma == GlobalVar.HU ? true  : false;
        this.isKy     = isHold ? false : koma == GlobalVar.KY ? true  : false;
        this.isKe     = isHold ? false : koma == GlobalVar.KE ? true  : false;
        this.isGi     = isHold ? false : koma == GlobalVar.GI ? true  : false;
        this.isKi     = isHold ? false : koma == GlobalVar.KI ? true  : false;
        this.isKa     = isHold ? false : koma == GlobalVar.KA ? true  : false;
        this.isHi     = isHold ? false : koma == GlobalVar.HI ? true  : false;
        this.isOu     = isHold ? false : koma == GlobalVar.OU ? true  : false;
        this.isNhu    = isHold ? false : koma == GlobalVar.NHU ? true : false;
        this.isNky    = isHold ? false : koma == GlobalVar.NKY ? true : false;
        this.isNke    = isHold ? false : koma == GlobalVar.NKE ? true : false;
        this.isNgi    = isHold ? false : koma == GlobalVar.NGI ? true : false;
        this.isNka    = isHold ? false : koma == GlobalVar.NKA ? true : false;
        this.isNhi    = isHold ? false : koma == GlobalVar.NHI ? true : false;
        this.moveArea = [];
        if(isEvolve) this.setEvolve();
    }

    // 駒成り
    setEvolve(){
        switch( this.koma ) {
            case GlobalVar.HU:
                this.koma  = GlobalVar.NHU;
                this.isHu  = false;
                this.isNhu = true;
                break;
         
            case GlobalVar.KY:
                this.koma  = GlobalVar.NKY;
                this.isKy  = false;
                this.isNky = true;
                break;
         
            case GlobalVar.KE:
                this.koma  = GlobalVar.NKE;
                this.isKe  = false;
                this.isNke = true;
                break;

            case GlobalVar.GI:
                this.koma  = GlobalVar.NGI;
                this.isGi  = false;
                this.isNgi = true;                
                break;
         
            case GlobalVar.KA:
                this.koma  = GlobalVar.NKA;
                this.isKa  = false;
                this.isNka = true;
                break;

            case GlobalVar.HI:
                this.koma  = GlobalVar.NHI;
                this.isHi  = false;
                this.isNhi = true;
                break;
        }
    }

    // 駒取り
    setHold(){
        this.isHold  = true;
        this.isOwn   = this.isOwn ?   false : true;
        this.isSente = this.isSente ? false : true;
        if(this.isEvolve) {
            switch( this.koma ) {
                case GlobalVar.NHU:
                    this.koma  = GlobalVar.HU;
                    this.isHu  = true;
                    this.isNhu = false;
                    this.isEvolve = false;
                    break;
             
                case GlobalVar.NKY:
                    this.koma  = GlobalVar.KY;
                    this.isKy  = true;
                    this.isNky = false;
                    this.isEvolve = false;
                    break;
             
                case GlobalVar.NKE:
                    this.koma  = GlobalVar.KE;
                    this.isKe  = true;
                    this.isNke = false;
                    this.isEvolve = false;
                    break;
    
                case GlobalVar.NGI:
                    this.koma  = GlobalVar.GI;
                    this.isGi  = true;
                    this.isNgi = false;
                    this.isEvolve = false;
                    break;
             
                case GlobalVar.NKA:
                    this.koma  = GlobalVar.KA;
                    this.isKa  = true;
                    this.isNka = false;
                    this.isEvolve = false;
                    break;
    
                case GlobalVar.NHI:
                    this.koma  = GlobalVar.HI;
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

        // 移動可能範囲算出
        if(GlobalFunc.isPiece(this)) {
            // 自駒の場合
            if (this.isOwn) {
                // 全移動方向に対して行けるか行けないか判断 
                for (let i = 0; i < 10; i++) {
                    // もしも[i]の方向に移動可能な駒であれば 
                    if (CanGo[i][this.koma]) {
                        // 移動先のマスを配列に追加 
                        movePos = this.position + Direction[i];
                        // ①移動禁止エリアに入っていない ②移動先に駒がない or 駒はあるが自駒じゃない
                        if (!in_array(movePos,GlobalVar.Guardian) && (is_null(board[movePos].koma) || (!is_null(board[movePos].koma) && !board[movePos].isOwn))) {
                            result.push(movePos);
                            // もしも[i]の方向にジャンプ可能な駒であれば
                            if (CanJump[i][this.koma]) {
                                for (let j = 1; j <= 8; j++) {
                                    // 移動先に駒があったら抜ける
                                    if (!is_null(board[movePos].koma)) break;
                                    movePos = this.position + Direction[i];
                                    movePos = movePos + Direction[i] * j;
                                    // ①移動禁止エリアに入っていない or 駒はあるが自駒じゃない
                                    if(in_array(movePos,GlobalVar.Guardian) || (!is_null(board[movePos].koma) && board[movePos].isOwn)){
                                        break;
                                    }else{
                                        result.push(movePos);
                                        // 移動先に駒があったら抜ける
                                        if (!is_null(board[movePos].koma)) break;
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
                for (let i = 0; i < 10; i++) {
                    // もしも[i]の方向に移動可能な駒であれば 
                    if (CanGo[i][this.koma]) {
                        // 移動先のマスを配列に追加
                        movePos = this.position + Direction[i];

                        // ①移動先に自駒がない ②移動禁止エリアに入っていない
                        if (!in_array(movePos,GlobalVar.Guardian) && (is_null(board[movePos].koma) || (!is_null(board[movePos].koma) && board[movePos].isOwn))) {
                            result.push(movePos);
                            // もしも[i]の方向にジャンプ可能な駒であれば
                            if (CanJump[i][this.koma]) {
                                for (let j = 1; j <= 8; j++) {
                                    // ①移動先に駒があったら
                                    if (!is_null(board[movePos].koma)) {
                                        break;
                                    }
                                    movePos = this.position + Direction[i];
                                    movePos = movePos + Direction[i] * j;
                                    // ①移動先に自駒がある ②移動禁止エリアに入っている
                                    if(in_array(movePos,GlobalVar.Guardian) || (!is_null(board[movePos].koma) && !board[movePos].isOwn)){
                                        break;
                                    }else{
                                        result.push(movePos);
                                        // ①移動先に駒があったら 
                                        if (!is_null(board[movePos].koma)) {
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

    // 駒打ち可能エリア生成
    setShotArea(board){
        let result = [];
        let koma   = this.isSente ? this.position - (GlobalVar.HOLD + GlobalVar.SENTE) : this.position - (GlobalVar.HOLD + GlobalVar.GOTE);

        switch( koma ) {
            case GlobalVar.HU:
                // 2歩判定用
                let checkNihuSuji = [];
                for (let piece in board) {
                    if(board[piece].isOwn && board[piece].isHu){
                        checkNihuSuji.push(Math.floor(board[piece].position / 10) * 10);
                    }
                }

                for(let i = 11; i <= 99; i++) {
                    if((!in_array(i,GlobalVar.Guardian)) && is_null(board[i].koma) && !in_array(Math.floor(i / 10) * 10,checkNihuSuji)) {
                        if(board[piece].isSente) {
                            if(!in_array(i,GlobalVar.Dan_1st)) {
                                result.push(i);
                            }
                        }else{
                            if(!in_array(i,GlobalVar.Dan_9th)) {
                                result.push(i);
                            }
                        }
                    }
                }
                break;
            
            case GlobalVar.KY:
                for(let i = 11; i <= 99; i++) {
                    if((!in_array(i,GlobalVar.Guardian)) && is_null(board[i].koma)) {
                        if(board[piece].isSente) {
                            if(!in_array(i,GlobalVar.Dan_1st)) {
                                result.push(i);
                            }
                        }else{
                            if(!in_array(i,GlobalVar.Dan_9th)) {
                                result.push(i);
                            }
                        }
                    }
                }
                break;
            
            case GlobalVar.KE:
                for(let i = 11; i <= 99; i++) {
                    if((!in_array(i,GlobalVar.Guardian)) && is_null(board[i].koma)) {
                        if(board[piece].isSente) {
                            if(!in_array(i,GlobalVar.Dan_1st) && !in_array(i,GlobalVar.Dan_2nd)) {
                                result.push(i);
                            }
                        }else{
                            if(!in_array(i,GlobalVar.Dan_9th) && !in_array(i,GlobalVar.Dan_8th)) {
                                result.push(i);
                            }
                        }
                    }
                }
                break;

            default:
                for(let i = 11; i <= 99; i++) {
                    if((!in_array(i,GlobalVar.Guardian)) && is_null(board[i].koma)) {
                        result.push(i);
                    }
                }
                break;
        }
        this.moveArea = result;            
    }

}
module.exports = Piece;