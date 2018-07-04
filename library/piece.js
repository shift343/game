class Piece {
    constructor(koma,position,isSente,isOwn,isHold,isEvolve){
        let global = require('../global');

        this.koma     = koma;
        this.position = parseInt(position);
        this.isSente  = isSente;
        this.isOwn    = isOwn;
        this.isHold   = isHold;
        this.isEvolve = isEvolve;        

        this.isHu  = koma == global.rule.HU ? true  : false;
        this.isKy  = koma == global.rule.KY ? true  : false;
        this.isKe  = koma == global.rule.KE ? true  : false;
        this.isGi  = koma == global.rule.GI ? true  : false;
        this.isKi  = koma == global.rule.KI ? true  : false;
        this.isKa  = koma == global.rule.KA ? true  : false;
        this.isHi  = koma == global.rule.HI ? true  : false;
        this.isOu  = koma == global.rule.OU ? true  : false;
        this.isNhu = koma == global.rule.NHU ? true : false;
        this.isNky = koma == global.rule.NKY ? true : false;
        this.isNke = koma == global.rule.NKE ? true : false;
        this.isNgi = koma == global.rule.NGI ? true : false;
        this.isNka = koma == global.rule.NKA ? true : false;
        this.isNhi = koma == global.rule.NHI ? true : false;

        this.moveArea = [];

        if(isEvolve) {
            this.setEvolve();
        }
    }

    // 駒成り
    setEvolve(){
        let global = require('../global');

        switch( this.koma ) {
            case global.rule.HU:
                this.koma  = global.rule.NHU;
                this.isHu  = false;
                this.isNhu = true;
                break;
         
            case global.rule.KY:
                this.koma  = global.rule.NKY;
                this.isKy  = false;
                this.isNky = true;
                break;
         
            case global.rule.KE:
                this.koma  = global.rule.NKE;
                this.isKe  = false;
                this.isNke = true;
                break;

            case global.rule.GI:
                this.koma  = global.rule.NGI;
                this.isGi  = false;
                this.isNgi = true;                
                break;
         
            case global.rule.KA:
                this.koma  = global.rule.NKA;
                this.isKa  = false;
                this.isNka = true;
                break;

            case global.rule.HI:
                this.koma  = global.rule.NHI;
                this.isHi  = false;
                this.isNhi = true;
                break;
        }
    }

    // 駒取り
    setHold(){
        let global = require('../global');
        this.isHold = true;
        this.isOwn  = this.isOwn ? false : true;
        this.isSente = this.isSente ? false : true;

        if(this.isEvolve) {
            switch( this.koma ) {
                case global.rule.NHU:
                    this.koma  = global.rule.HU;
                    this.isHu  = true;
                    this.isNhu = false;
                    this.isEvolve = false;
                    break;
             
                case global.rule.NKY:
                    this.koma  = global.rule.KY;
                    this.isKy  = true;
                    this.isNky = false;
                    this.isEvolve = false;
                    break;
             
                case global.rule.NKE:
                    this.koma  = global.rule.KE;
                    this.isKe  = true;
                    this.isNke = false;
                    this.isEvolve = false;
                    break;
    
                case global.rule.NGI:
                    this.koma  = global.rule.GI;
                    this.isGi  = true;
                    this.isNgi = false;
                    this.isEvolve = false;
                    break;
             
                case global.rule.NKA:
                    this.koma  = global.rule.KA;
                    this.isKa  = true;
                    this.isNka = false;
                    this.isEvolve = false;
                    break;
    
                case global.rule.NHI:
                    this.koma  = global.rule.HI;
                    this.isHi  = true;
                    this.isNhi = false;
                    this.isEvolve = false;

                    break;
            }

        }
    }

    // 移動可能範囲生成
    setMoveArea(board){

        // モジュール読み込み
        let global = require('../global');
        let common = require('../common');

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
                    if ((common.is_empty(board[movePos]) || (!common.is_empty(board[movePos]) && board[movePos].isOwn == false)) && !global.rule.Guardian.includes(movePos)) {
                        result.push(movePos);
                        // もしも[i]の方向にジャンプ可能な駒であれば
                        if (CanJump[i][this.koma]) {
                            for (var j = 1; j <= 8; j++) {
                                // ①移動先に駒があったら
                                if (!common.is_empty(board[movePos])) {
                                    break;
                                }
                                movePos = this.position + Direction[i];
                                movePos = movePos + Direction[i] * j;
                                // ①移動先に自駒がある ②移動禁止エリアに入っている
                                if((!common.is_empty(board[movePos]) && board[movePos].isOwn == true) || global.rule.Guardian.includes(movePos)){
                                    break;
                                }else{
                                    result.push(movePos);
                                    // ①移動先に駒があったら 
                                    if (!common.is_empty(board[movePos])) {
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
                    if ((common.is_empty(board[movePos]) || (!common.is_empty(board[movePos]) && board[movePos].isOwn == true)) && !global.rule.Guardian.includes(movePos)) {
                        result.push(movePos);
                        // もしも[i]の方向にジャンプ可能な駒であれば
                        if (CanJump[i][this.koma]) {
                            for (var j = 1; j <= 8; j++) {
                                // ①移動先に駒があったら
                                if (!common.is_empty(board[movePos])) {
                                    break;
                                }
                                movePos = this.position + Direction[i];
                                movePos = movePos + Direction[i] * j;
                                // ①移動先に自駒がある ②移動禁止エリアに入っている
                                if((!common.is_empty(board[movePos]) && board[movePos].isOwn == false) || global.rule.Guardian.includes(movePos)){
                                    break;
                                }else{
                                    result.push(movePos);
                                    // ①移動先に駒があったら 
                                    if (!common.is_empty(board[movePos])) {
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
module.exports = Piece;