let Rule = {

    SENTE:100,
    GOTE :200,
    HOLD :1000,
    HU   :0,
    KY   :1,
    KE   :2,
    GI   :3,
    KI   :4,
    KA   :5,
    HI   :6,
    OU   :7,
    NHU  :8,
    NKY  :9,
    NKE  :10,
    NGI  :11,
    NKA  :12,
    NHI  :13,

    EVOLVE  : {100:108,101:109,102:110,103:111,105:112,106:113,200:208,201:209,202:210,203:211,205:212,206:213},
    REVERSE : {100:200,101:201,102:202,103:203,104:204,105:205,106:206,107:207,108:200,109:201,110:202,111:203,112:205,113:206,
               200:100,201:101,202:102,203:103,204:104,205:105,206:106,207:107,208:100,209:101,210:102,211:103,212:105,213:106},

    Guardian : [0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,101,102,103,104,105,106,107,108,109,110],

    Dan_1st : [11,21,31,41,51,61,71,81,91],
    Dan_2nd : [12,22,32,42,52,62,72,82,92],
    Dan_3rd : [13,23,33,43,53,63,73,83,93],
    Dan_4th : [14,24,34,44,54,64,74,84,94],
    Dan_5th : [15,25,35,45,55,65,75,85,95],
    Dan_6th : [16,26,36,46,56,66,76,86,96],
    Dan_7th : [17,27,37,47,57,67,77,87,97],
    Dan_8th : [18,28,38,48,58,68,78,88,98],
    Dan_9th : [19,29,39,49,59,69,79,89,99],

    Suji_1st : [11,12,13,14,15,16,17,18,19],
    Suji_2nd : [21,22,23,24,25,26,27,28,29],
    Suji_3rd : [31,32,33,34,35,36,37,38,39],
    Suji_4th : [41,42,43,44,45,46,47,48,49],
    Suji_5th : [51,52,53,54,55,56,57,58,59],
    Suji_6th : [61,62,63,64,65,66,67,68,69],
    Suji_7th : [71,72,73,74,75,76,77,78,79],
    Suji_8th : [81,82,83,84,85,86,87,88,89],
    Suji_9th : [91,92,93,94,95,96,97,98,99],

    // 駒が成る
    EvolveKoma : function (koma) {
        koma = this.EVOLVE[koma];
        return koma;
    },

    // 駒を取る
    HoldKoma : function (board,moveTo) {
        let koma = this.REVERSE[board[moveTo]];
        let key = koma + this.HOLD;
        board[key] ? board[key]++ : board[key] = 1;
        return board;
    },

    // 盤面を更新する
    UpdateBoard : function (board,koma,moveFrom,moveTo,isEvolve) {
        if(isEvolve) {
            koma = this.EvolveKoma(koma);
        }
        if(board[moveTo]) {
            board = this.HoldKoma(board,moveTo);
        }
        delete board[moveFrom];
        board[moveTo] = koma;
        return board;
    }


};


module.exports = Rule;