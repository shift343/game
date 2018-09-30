/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/index.js":
/*!*************************!*\
  !*** ./assets/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./sass/app.scss */ "./assets/sass/app.scss");

__webpack_require__(/*! ./js/app.js */ "./assets/js/app.js");

/***/ }),

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./common/commonVar.js */ "./assets/js/common/commonVar.js");

__webpack_require__(/*! ./common/commonFunc.js */ "./assets/js/common/commonFunc.js");

__webpack_require__(/*! ./common/globalVar.js */ "./assets/js/common/globalVar.js");

__webpack_require__(/*! ./common/globalFunc.js */ "./assets/js/common/globalFunc.js");

var _game = __webpack_require__(/*! ./components/game.js */ "./assets/js/components/game.js");

var _game2 = _interopRequireDefault(_game);

var _piece = __webpack_require__(/*! ./components/piece.js */ "./assets/js/components/piece.js");

var _piece2 = _interopRequireDefault(_piece);

var _board = __webpack_require__(/*! ./components/board.js */ "./assets/js/components/board.js");

var _board2 = _interopRequireDefault(_board);

__webpack_require__(/*! ./components/komaAction.js */ "./assets/js/components/komaAction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Game = _game2.default; // 共通ファイル読み込み
window.Piece = _piece2.default;
window.Board = _board2.default;

/***/ }),

/***/ "./assets/js/common/commonFunc.js":
/*!****************************************!*\
  !*** ./assets/js/common/commonFunc.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.is_empty = function (_var) {
    if (_var == null) {
        return true;
    }
    switch (typeof _var === 'undefined' ? 'undefined' : _typeof(_var)) {
        case 'object':
            if (Array.isArray(_var)) {
                // When object is array:
                return _var.length === 0;
            } else {
                // When object is not array:
                if (Object.keys(_var).length > 0 || Object.getOwnPropertySymbols(_var).length > 0) {
                    return false;
                } else if (_var.valueOf().length !== undefined) {
                    return _var.valueOf().length === 0;
                } else if (_typeof(_var.valueOf()) !== 'object') {
                    return is_empty(_var.valueOf());
                } else {
                    return true;
                }
            }
            break;
        case 'string':
            return _var === '';
            break;
        case 'number':
            return _var == 0;
            break;
        case 'boolean':
            return !_var;
            break;
        case 'undefined':
        case 'null':
            return true;
            break;
        case 'symbol':
        // Since ECMAScript6
        case 'function':
        default:
            return false;
            break;
    }
};

window.var_dump = function (_var) {
    var util = __webpack_require__(/*! util */ "./node_modules/util/util.js");
    return console.log(util.inspect(_var));
};

window.in_array = function (_var, _arr) {
    return _arr.indexOf(_var) >= 0 || _arr.indexOf(Number(_var)) >= 0 ? true : false;
};

window.is_null = function (_var) {
    return _var == null ? true : false;
};

/***/ }),

/***/ "./assets/js/common/commonVar.js":
/*!***************************************!*\
  !*** ./assets/js/common/commonVar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.clickEventType = function () {
    return window.ontouchstart !== null ? 'click' : 'touchstart';
};

/***/ }),

/***/ "./assets/js/common/globalFunc.js":
/*!****************************************!*\
  !*** ./assets/js/common/globalFunc.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.GlobalFunc = {
    // 先手駒か
    isSente: function isSente(koma) {
        return koma >= GlobalVar.SENTE && koma < GlobalVar.GOTE ? true : false;
    },
    // 後手駒か
    isGote: function isGote(koma) {
        return koma >= GlobalVar.GOTE && koma < GlobalVar.HOLD ? true : false;
    },
    // 先手持ち駒か
    isSenteHold: function isSenteHold(pos) {
        return pos >= GlobalVar.HOLD + GlobalVar.SENTE && pos < GlobalVar.HOLD + GlobalVar.GOTE ? true : false;
    },
    // 後手持ち駒か
    isGoteHold: function isGoteHold(pos) {
        return pos >= GlobalVar.HOLD + GlobalVar.GOTE ? true : false;
    },
    // 駒があるマスかどうか
    isPiece: function isPiece(piece) {
        return piece.koma != null ? true : false;
    },

    // 駒が成る
    MakeEvolve: function MakeEvolve(koma) {
        return GlobalVar.EVOLVE[koma];
    },

    // 駒を取る
    TakeKoma: function TakeKoma(board, moveTo) {
        var koma = GlobalVar.REVERSE[board[moveTo]];
        var key = koma + this.HOLD;
        board[key]++;
        return board;
    },

    // 盤面を更新する
    UpdateBoard: function UpdateBoard(board, koma, moveFrom, moveTo, isEvolve) {
        if (isEvolve) {
            koma = MakeEvolve(koma);
        }
        if (board[moveTo]) {
            board = TakeKoma(board, moveTo);
        }
        board[moveFrom] = null;
        board[moveTo] = koma;
        return board;
    }

};

/***/ }),

/***/ "./assets/js/common/globalVar.js":
/*!***************************************!*\
  !*** ./assets/js/common/globalVar.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.GlobalVar = {

           SENTE: 100,
           GOTE: 200,
           HOLD: 1000,
           HU: 0,
           KY: 1,
           KE: 2,
           GI: 3,
           KI: 4,
           KA: 5,
           HI: 6,
           OU: 7,
           NHU: 8,
           NKY: 9,
           NKE: 10,
           NGI: 11,
           NKA: 12,
           NHI: 13,

           EVOLVE: { 100: 108, 101: 109, 102: 110, 103: 111, 105: 112, 106: 113, 200: 208, 201: 209, 202: 210, 203: 211, 205: 212, 206: 213 },
           REVERSE: { 100: 200, 101: 201, 102: 202, 103: 203, 104: 204, 105: 205, 106: 206, 107: 207, 108: 200, 109: 201, 110: 202, 111: 203, 112: 205, 113: 206,
                      200: 100, 201: 101, 202: 102, 203: 103, 204: 104, 205: 105, 206: 106, 207: 107, 208: 100, 209: 101, 210: 102, 211: 103, 212: 105, 213: 106 },

           Guardian: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110],

           Dan_1st: [11, 21, 31, 41, 51, 61, 71, 81, 91],
           Dan_2nd: [12, 22, 32, 42, 52, 62, 72, 82, 92],
           Dan_3rd: [13, 23, 33, 43, 53, 63, 73, 83, 93],
           Dan_4th: [14, 24, 34, 44, 54, 64, 74, 84, 94],
           Dan_5th: [15, 25, 35, 45, 55, 65, 75, 85, 95],
           Dan_6th: [16, 26, 36, 46, 56, 66, 76, 86, 96],
           Dan_7th: [17, 27, 37, 47, 57, 67, 77, 87, 97],
           Dan_8th: [18, 28, 38, 48, 58, 68, 78, 88, 98],
           Dan_9th: [19, 29, 39, 49, 59, 69, 79, 89, 99],

           Suji_1st: [11, 12, 13, 14, 15, 16, 17, 18, 19],
           Suji_2nd: [21, 22, 23, 24, 25, 26, 27, 28, 29],
           Suji_3rd: [31, 32, 33, 34, 35, 36, 37, 38, 39],
           Suji_4th: [41, 42, 43, 44, 45, 46, 47, 48, 49],
           Suji_5th: [51, 52, 53, 54, 55, 56, 57, 58, 59],
           Suji_6th: [61, 62, 63, 64, 65, 66, 67, 68, 69],
           Suji_7th: [71, 72, 73, 74, 75, 76, 77, 78, 79],
           Suji_8th: [81, 82, 83, 84, 85, 86, 87, 88, 89],
           Suji_9th: [91, 92, 93, 94, 95, 96, 97, 98, 99],

           Sente_area: [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63, 71, 72, 73, 81, 82, 83, 91, 92, 93],
           Gote_area: [17, 18, 19, 27, 28, 29, 37, 38, 39, 47, 48, 49, 57, 58, 59, 67, 68, 69, 77, 78, 79, 87, 88, 89, 97, 98, 99],

           InitPlace: { 91: 201, 81: 202, 71: 203, 61: 204, 51: 207, 41: 204, 31: 203, 21: 202, 11: 201,
                      92: null, 82: 206, 72: null, 62: null, 52: null, 42: null, 32: null, 22: 205, 12: null,
                      93: 200, 83: 200, 73: 200, 63: 200, 53: 200, 43: 200, 33: 200, 23: 200, 13: 200,
                      94: null, 84: null, 74: null, 64: null, 54: null, 44: null, 34: null, 24: null, 14: null,
                      95: null, 85: null, 75: null, 65: null, 55: null, 45: null, 35: null, 25: null, 15: null,
                      96: null, 86: null, 76: null, 66: null, 56: null, 46: null, 36: null, 26: null, 16: null,
                      97: 100, 87: 100, 77: 100, 67: 100, 57: 100, 47: 100, 37: 100, 27: 100, 17: 100,
                      98: null, 88: 105, 78: null, 68: null, 58: null, 48: null, 38: null, 28: 106, 18: null,
                      99: 101, 89: 102, 79: 103, 69: 104, 59: 107, 49: 104, 39: 103, 29: 102, 19: 101,
                      1100: 0, 1101: 0, 1102: 0, 1103: 0, 1104: 0, 1105: 0, 1106: 0,
                      1200: 0, 1201: 0, 1202: 0, 1203: 0, 1204: 0, 1205: 0, 1206: 0
           }
};

/***/ }),

/***/ "./assets/js/components/board.js":
/*!***************************************!*\
  !*** ./assets/js/components/board.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {

    // 盤面配列を渡して盤面クラス生成
    function Board(board, game) {
        _classCallCheck(this, Board);

        this.setBoard(board, game);
    }

    // 盤面生成


    _createClass(Board, [{
        key: "setBoard",
        value: function setBoard(board, game) {

            // 駒のインスタンスを生成
            for (var pos in board) {

                // 先手駒
                if (GlobalFunc.isSente(board[pos])) {
                    var koma = board[pos] - GlobalVar.SENTE;
                    var position = pos;
                    var isSente = true;
                    var isOwn = game.sente == game.ownId ? true : false;
                    var isHold = false;
                    var isEvolve = koma >= GlobalVar.NHU ? true : false;
                    this[pos] = new Piece(koma, position, isSente, isOwn, isHold, isEvolve);

                    // 後手駒
                } else if (GlobalFunc.isGote(board[pos])) {
                    var _koma = board[pos] - GlobalVar.GOTE;
                    var _position = pos;
                    var _isSente = false;
                    var _isOwn = game.gote == game.ownId ? true : false;
                    var _isHold = false;
                    var _isEvolve = _koma >= GlobalVar.NHU ? true : false;
                    this[pos] = new Piece(_koma, _position, _isSente, _isOwn, _isHold, _isEvolve);

                    // 先手持ち駒
                } else if (GlobalFunc.isSenteHold(pos)) {
                    var _koma2 = board[pos];
                    var _position2 = pos;
                    var _isSente2 = true;
                    var _isOwn2 = game.sente == game.ownId ? true : false;
                    var _isHold2 = true;
                    var _isEvolve2 = false;
                    this[pos] = new Piece(_koma2, _position2, _isSente2, _isOwn2, _isHold2, _isEvolve2);

                    // 後手持ち駒
                } else if (GlobalFunc.isGoteHold(pos)) {
                    var _koma3 = board[pos];
                    var _position3 = pos;
                    var _isSente3 = false;
                    var _isOwn3 = game.gote == game.ownId ? true : false;
                    var _isHold3 = true;
                    var _isEvolve3 = false;
                    this[pos] = new Piece(_koma3, _position3, _isSente3, _isOwn3, _isHold3, _isEvolve3);

                    // 駒のないマス
                } else {
                    this[pos] = new Piece(null, pos, false, false, false, false);
                }
            };
            this.showMoveArea(this);
        }

        // 単純な盤面配列に変換

    }, {
        key: "convertBoard",
        value: function convertBoard(board) {
            var result = {};
            for (var piece in board) {
                if (is_null(board[piece].koma)) {
                    result[piece] = null;
                } else if (piece > GlobalVar.HOLD) {
                    result[piece] = board[piece].koma;
                } else {
                    if (board[piece].isSente) {
                        result[piece] = board[piece].koma + GlobalVar.SENTE;
                    } else {
                        result[piece] = board[piece].koma + GlobalVar.GOTE;
                    }
                }
            }
            return result;
        }

        // 移動可能範囲生成

    }, {
        key: "showMoveArea",
        value: function showMoveArea(board) {
            for (var piece in board) {
                piece = !board[piece].isHold ? board[piece].setMoveArea(board) : !is_null(board[piece].koma) ? board[piece].setShotArea(board) : piece;
            }
            return board;
        }

        // 移動可能範囲から合法手を生成

    }, {
        key: "extractLegalArea",
        value: function extractLegalArea(board, game) {

            // 一時的に上書き用のクラスを作る
            var tempBoard = new Board(board.convertBoard(board), game);

            for (var piece in board) {
                if (board[piece].isOwn && !board[piece].isHold) {
                    // 最終的な合法手
                    var extractLegalMoveArea = board[piece].moveArea;
                    // 移動元の駒を複製
                    var beforePiece = new Piece(board[piece].koma, board[piece].position, board[piece].isSente, true, board[piece].isHold, board[piece].isEvolve);
                    // 一手一手進めた駒で盤面を判断していく
                    for (var movePos in extractLegalMoveArea) {
                        // 移動先の駒を生成
                        var afterPiece = new Piece(board[piece].koma, extractLegalMoveArea[movePos], board[piece].isSente, true, board[piece].isHold, board[piece].isEvolve);
                        // 移動先巻き戻し用の駒を複製
                        var reversePiece = is_null(board[extractLegalMoveArea[movePos]].koma) ? new Piece(null, extractLegalMoveArea[movePos], false, false, false, false) : board[extractLegalMoveArea[movePos]];
                        // 移動先を上書き
                        tempBoard[extractLegalMoveArea[movePos]] = afterPiece;
                        // 移動元を初期化
                        tempBoard[board[piece].position] = new Piece(null, board[piece].position, false, false, false, false);
                        // 王手の掛かる手かチェックし、そうだった場合は選択マスから削除
                        var isCheck = tempBoard.isCheck(tempBoard.showMoveArea(tempBoard));
                        if (isCheck["isOwn"]) {
                            delete extractLegalMoveArea[movePos];
                        }
                        // 移動元を戻す
                        tempBoard[beforePiece.position] = beforePiece;
                        // 移動先を巻き戻し
                        tempBoard[afterPiece.position] = reversePiece;
                    }
                    board[piece].moveArea = extractLegalMoveArea;
                } else if (board[piece].isOwn && board[piece].isHold) {}
            }
        }

        // 自王の位置を取得

    }, {
        key: "getKingPosition",
        value: function getKingPosition(board) {
            var king = { "isOwn": null, "isEnemy": null };
            for (var piece in board) {
                if (board[piece].isOu && board[piece].isOwn) {
                    king["isOwn"] = board[piece].position;
                } else if (board[piece].isOu && !board[piece].isOwn) {
                    king["isEnemy"] = board[piece].position;
                }
            }
            return king;
        }

        // 自玉or相手玉が王手を掛けられているか判定

    }, {
        key: "isCheck",
        value: function isCheck(board) {
            var king = board.getKingPosition(board);
            var isCheck = { "isOwn": false, "isEnemy": false };
            for (var piece in board) {
                if (in_array(king["isOwn"], board[piece].moveArea)) {
                    isCheck["isOwn"] = true;
                } else if (in_array(king["isEnemy"], board[piece].moveArea)) {
                    isCheck["isEnemy"] = true;
                }
            }
            return isCheck;
        }

        //自玉or相手玉が詰んでいるか判定

    }, {
        key: "isCheckMate",
        value: function isCheckMate(board) {
            var isCheckMate = { "isOwn": true, "isEnemy": true };
            for (var piece in board) {
                if (board[piece].isOwn && board[piece].moveArea.length > 0) {
                    isCheckMate["isOwn"] = false;
                } else if (!board[piece].isOwn && board[piece].moveArea.length > 0) {
                    isCheckMate["isEnemy"] = false;
                }
            }
            return isCheckMate;
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),

/***/ "./assets/js/components/game.js":
/*!**************************************!*\
  !*** ./assets/js/components/game.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game(matchingInfo, own) {
    _classCallCheck(this, Game);

    // 対局情報
    this.roomId = matchingInfo.roomId;
    this.ownId = own.id;
    this.sente = matchingInfo.sente.id;
    this.gote = matchingInfo.gote.id;
    this.isSente = this.ownId == this.sente ? true : false;
    this.isGote = this.ownId == this.gote ? true : false;

    // 進行状況
    this.battleStatus = 0;
};

exports.default = Game;

/***/ }),

/***/ "./assets/js/components/komaAction.js":
/*!********************************************!*\
  !*** ./assets/js/components/komaAction.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//駒画像を表示する関数
function dispInitKomaImg() {
  $(".isOwn").each(function () {
    var komaId = $(this).attr('name');
    var komaImg = getKomaImg(komaId, true);
    $(this).append("<img src='/images/pieces/" + komaImg + "' height='100%'>");
  });

  $(".isEnemy").each(function () {
    var komaId = $(this).attr('name');
    var komaImg = getKomaImg(komaId, false);
    $(this).append("<img src='/images/pieces/" + komaImg + "' height='100%'>");
  });
}

function updateKomaImg(koma, moveFrom, moveTo, isOwn) {

  // 移動前の要素更新
  var fromId = $("#" + moveFrom);
  $(fromId).attr("name", "");
  $(fromId).removeClass("isOwn").removeClass("isEnemy");
  $(fromId).children("img").remove();

  // 移動後の要素更新
  var toId = $("#" + moveTo);
  $(toId).attr("name", koma);
  if (isOwn) {
    $(toId).removeClass("isEnemy").addClass("isOwn"); //動かした側
  } else {
    $(toId).removeClass("isOwn").addClass("isEnemy"); //動かされた側
  }

  // 移動後のチカチカを消す
  $(".square").each(function () {
    $(this).removeClass("onTaped");
  });
  // 移動後のチカチカをつける
  $(toId).addClass("onTaped");

  $(toId).children("img").remove();
  var komaImg = getKomaImg(koma, isOwn);
  $(toId).append("<img src='/images/pieces/" + komaImg + "' height='100%'>");
}

/* ブラックアウト&移動可能範囲付与 */
function addBlackOut_SelectArea(komaInfo, toPos) {
  $(".square").each(function () {
    var id = parseInt($(this).attr("id"));

    //console.log(board[id].moveArea);
    if (id != toPos && $.inArray(id, komaInfo["moveArea"]) == -1) {
      $(this).children("div").addClass("blackOut");
    } else if ($.inArray(id, komaInfo["moveArea"]) >= 0) {
      $(this).addClass("selectArea");
    }
  });
}

/* 選択フラグ、ブラックアウト、移動可能範囲をクリア */
function removeOnTap_SelectArea_BlackOut() {
  $(".square").each(function () {
    $(this).removeClass("onTap");
    $(this).removeClass("selectArea");
    $(this).children("div").removeClass("blackOut");
  });
}

/* 駒画像 */
function getKomaImg(koma, isOwn) {
  if (isOwn) {
    switch (Number(koma)) {
      case 0:
        return "Sfu.png";
      case 1:
        return "Skyo.png";
      case 2:
        return "Skei.png";
      case 3:
        return "Sgin.png";
      case 4:
        return "Skin.png";
      case 5:
        return "Skaku.png";
      case 6:
        return "Shi.png";
      case 7:
        return "Sou.png";
      case 8:
        return "Sto.png";
      case 9:
        return "Snkyo.png";
      case 10:
        return "Snkei.png";
      case 11:
        return "Sngin.png";
      case 12:
        return "Suma.png";
      case 13:
        return "Sryu.png";
    }
  } else {
    switch (Number(koma)) {
      case 0:
        return "Efu.png";
      case 1:
        return "Ekyo.png";
      case 2:
        return "Ekei.png";
      case 3:
        return "Egin.png";
      case 4:
        return "Ekin.png";
      case 5:
        return "Ekaku.png";
      case 6:
        return "Ehi.png";
      case 7:
        return "Eou.png";
      case 8:
        return "Eto.png";
      case 9:
        return "Enkyo.png";
      case 10:
        return "Enkei.png";
      case 11:
        return "Engin.png";
      case 12:
        return "Euma.png";
      case 13:
        return "Eryu.png";
    }
  }
}

function setHand(board) {

  $("#own").children(".hand").remove();
  $("#enemy").children(".hand").remove();

  for (var piece in board) {
    if (piece > game.HOLD) {
      if (board[piece].isOwn) {
        var koma = piece > game.HOLD + game.GOTE ? piece - (game.HOLD + game.GOTE) : piece - (game.HOLD + game.SENTE);
        var komaImg = getKomaImg(koma, true);
        $("#own").append("<div class='hand square isOwn' id='" + board[piece].position + "' name='" + koma + "' tap='0'><img src='/images/pieces/" + komaImg + "' height='100%'></div>");
      } else {
        var _koma = piece > game.HOLD + game.GOTE ? piece - (game.HOLD + game.GOTE) : piece - (game.HOLD + game.SENTE);
        var _komaImg = getKomaImg(_koma, false);
        $("#enemy").append("<div class='hand square isEnemy' id='" + board[piece].position + "' name='" + _koma + "' tap='0'><img src='/images/pieces/" + _komaImg + "' height='100%'></div>");
      }
    }
  }
}

function convertBoard(board) {
  var result = {};
  for (var piece in board) {
    if (piece > game.HOLD) {
      result[piece] = board[piece].koma;
    } else {
      if (board[piece].isSente) {
        result[piece] = board[piece].koma + 100;
      } else {
        result[piece] = board[piece].koma + 200;
      }
    }
  }
  return result;
}

/***/ }),

/***/ "./assets/js/components/piece.js":
/*!***************************************!*\
  !*** ./assets/js/components/piece.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
    function Piece(koma, position, isSente, isOwn, isHold, isEvolve) {
        _classCallCheck(this, Piece);

        this.koma = koma;
        this.position = parseInt(position);
        this.isSente = isSente;
        this.isOwn = isOwn;
        this.isEvolve = isEvolve;
        this.isHold = isHold;
        this.isHu = isHold ? false : koma == GlobalVar.HU ? true : false;
        this.isKy = isHold ? false : koma == GlobalVar.KY ? true : false;
        this.isKe = isHold ? false : koma == GlobalVar.KE ? true : false;
        this.isGi = isHold ? false : koma == GlobalVar.GI ? true : false;
        this.isKi = isHold ? false : koma == GlobalVar.KI ? true : false;
        this.isKa = isHold ? false : koma == GlobalVar.KA ? true : false;
        this.isHi = isHold ? false : koma == GlobalVar.HI ? true : false;
        this.isOu = isHold ? false : koma == GlobalVar.OU ? true : false;
        this.isNhu = isHold ? false : koma == GlobalVar.NHU ? true : false;
        this.isNky = isHold ? false : koma == GlobalVar.NKY ? true : false;
        this.isNke = isHold ? false : koma == GlobalVar.NKE ? true : false;
        this.isNgi = isHold ? false : koma == GlobalVar.NGI ? true : false;
        this.isNka = isHold ? false : koma == GlobalVar.NKA ? true : false;
        this.isNhi = isHold ? false : koma == GlobalVar.NHI ? true : false;
        this.moveArea = [];
        if (this.isHold) this.setHold();
        this.komaImg = this.isHold && this.koma == 0 || is_null(this.koma) ? null : this.setKomaImg();
    }

    _createClass(Piece, [{
        key: "setHold",
        value: function setHold() {
            var koma = this.isSente ? this.position - (GlobalVar.HOLD + GlobalVar.SENTE) : this.position - (GlobalVar.HOLD + GlobalVar.GOTE);
            switch (koma) {
                case 0:
                    this.isHu = true;break;
                case 1:
                    this.isKy = true;break;
                case 2:
                    this.isKe = true;break;
                case 3:
                    this.isGi = true;break;
                case 4:
                    this.isKi = true;break;
                case 5:
                    this.isKa = true;break;
                case 6:
                    this.isHi = true;break;
                case 7:
                    this.isOu = true;break;
                case 8:
                    this.isNhu = true;break;
                case 9:
                    this.isNky = true;break;
                case 10:
                    this.isNke = true;break;
                case 11:
                    this.isNgi = true;break;
                case 12:
                    this.isNka = true;break;
                case 13:
                    this.isNhi = true;break;
            }
        }
    }, {
        key: "setKomaImg",
        value: function setKomaImg() {
            if (this.isOwn) {
                if (this.isHu) return "Sfu.png";
                if (this.isKy) return "Skyo.png";
                if (this.isKe) return "Skei.png";
                if (this.isGi) return "Sgin.png";
                if (this.isKi) return "Skin.png";
                if (this.isKa) return "Skaku.png";
                if (this.isHi) return "Shi.png";
                if (this.isOu) return "Sou.png";
                if (this.isNhu) return "Sto.png";
                if (this.isNky) return "Snkyo.png";
                if (this.isNke) return "Snkei.png";
                if (this.isNgi) return "Sngin.png";
                if (this.isNka) return "Suma.png";
                if (this.isNhi) return "Sryu.png";
            } else {
                if (this.isHu) return "Efu.png";
                if (this.isKy) return "Ekyo.png";
                if (this.isKe) return "Ekei.png";
                if (this.isGi) return "Egin.png";
                if (this.isKi) return "Ekin.png";
                if (this.isKa) return "Ekaku.png";
                if (this.isHi) return "Ehi.png";
                if (this.isOu) return "Eou.png";
                if (this.isNhu) return "Eto.png";
                if (this.isNky) return "Enkyo.png";
                if (this.isNke) return "Enkei.png";
                if (this.isNgi) return "Engin.png";
                if (this.isNka) return "Euma.png";
                if (this.isNhi) return "Eryu.png";
            }
        }

        // 移動可能範囲生成

    }, {
        key: "setMoveArea",
        value: function setMoveArea(board) {
            var Direction = [];

            Direction[0] = 10; //←
            Direction[1] = 11; //←↓
            Direction[2] = 1; //↓
            Direction[3] = -9; //→↓
            Direction[4] = -10; //→
            Direction[5] = -11; //→↑
            Direction[6] = -1; //↑
            Direction[7] = 9; //←↑
            Direction[8] = -12; //桂馬右飛び
            Direction[9] = 8; //桂馬左飛び

            /* 歩香桂銀金角飛玉と杏圭全馬竜 (Direction順) */
            var CanGo = [[0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

            /* 歩香桂銀金角飛玉と杏圭全馬竜 (Direction順) */
            var CanJump = [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

            // 後手だったらDirectionの中身に-1をかける 
            if (!this.isSente) {
                Direction.forEach(function (val, key) {
                    Direction[key] = val * -1;
                });
            }

            // 移動可能範囲初期化
            var result = [];

            // 移動先初期化
            var movePos = null;

            // 移動可能範囲算出
            if (GlobalFunc.isPiece(this)) {
                // 自駒の場合
                if (this.isOwn) {
                    // 全移動方向に対して行けるか行けないか判断 
                    for (var i = 0; i < 10; i++) {
                        // もしも[i]の方向に移動可能な駒であれば 
                        if (CanGo[i][this.koma]) {
                            // 移動先のマスを配列に追加 
                            movePos = this.position + Direction[i];
                            // ①移動禁止エリアに入っていない ②移動先に駒がない or 駒はあるが自駒じゃない
                            if (!in_array(movePos, GlobalVar.Guardian) && (is_null(board[movePos].koma) || !is_null(board[movePos].koma) && !board[movePos].isOwn)) {
                                result.push(movePos);
                                // もしも[i]の方向にジャンプ可能な駒であれば
                                if (CanJump[i][this.koma]) {
                                    for (var j = 1; j <= 8; j++) {
                                        // 移動先に駒があったら抜ける
                                        if (!is_null(board[movePos].koma)) break;
                                        movePos = this.position + Direction[i];
                                        movePos = movePos + Direction[i] * j;
                                        // ①移動禁止エリアに入っていない or 駒はあるが自駒じゃない
                                        if (in_array(movePos, GlobalVar.Guardian) || !is_null(board[movePos].koma) && board[movePos].isOwn) {
                                            break;
                                        } else {
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
                        for (var _i = 0; _i < 10; _i++) {
                            // もしも[i]の方向に移動可能な駒であれば 
                            if (CanGo[_i][this.koma]) {
                                // 移動先のマスを配列に追加
                                movePos = this.position + Direction[_i];

                                // ①移動先に自駒がない ②移動禁止エリアに入っていない
                                if (!in_array(movePos, GlobalVar.Guardian) && (is_null(board[movePos].koma) || !is_null(board[movePos].koma) && board[movePos].isOwn)) {
                                    result.push(movePos);
                                    // もしも[i]の方向にジャンプ可能な駒であれば
                                    if (CanJump[_i][this.koma]) {
                                        for (var _j = 1; _j <= 8; _j++) {
                                            // ①移動先に駒があったら
                                            if (!is_null(board[movePos].koma)) {
                                                break;
                                            }
                                            movePos = this.position + Direction[_i];
                                            movePos = movePos + Direction[_i] * _j;
                                            // ①移動先に自駒がある ②移動禁止エリアに入っている
                                            if (in_array(movePos, GlobalVar.Guardian) || !is_null(board[movePos].koma) && !board[movePos].isOwn) {
                                                break;
                                            } else {
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

    }, {
        key: "setShotArea",
        value: function setShotArea(board) {
            var result = [];
            var koma = this.isSente ? this.position - (GlobalVar.HOLD + GlobalVar.SENTE) : this.position - (GlobalVar.HOLD + GlobalVar.GOTE);

            switch (koma) {
                case GlobalVar.HU:
                    // 2歩判定用
                    var checkNihuSuji = [];
                    for (var piece in board) {
                        if (board[piece].isOwn && board[piece].isHu) {
                            checkNihuSuji.push(Math.floor(board[piece].position / 10) * 10);
                        }
                    }

                    for (var i = 11; i <= 99; i++) {
                        if (!in_array(i, GlobalVar.Guardian) && is_null(board[i].koma) && !in_array(Math.floor(i / 10) * 10, checkNihuSuji)) {
                            if (this.isSente) {
                                if (!in_array(i, GlobalVar.Dan_1st)) {
                                    result.push(i);
                                }
                            } else {
                                if (!in_array(i, GlobalVar.Dan_9th)) {
                                    result.push(i);
                                }
                            }
                        }
                    }
                    break;

                case GlobalVar.KY:
                    for (var _i2 = 11; _i2 <= 99; _i2++) {
                        if (!in_array(_i2, GlobalVar.Guardian) && is_null(board[_i2].koma)) {
                            if (this.isSente) {
                                if (!in_array(_i2, GlobalVar.Dan_1st)) {
                                    result.push(_i2);
                                }
                            } else {
                                if (!in_array(_i2, GlobalVar.Dan_9th)) {
                                    result.push(_i2);
                                }
                            }
                        }
                    }
                    break;

                case GlobalVar.KE:
                    for (var _i3 = 11; _i3 <= 99; _i3++) {
                        if (!in_array(_i3, GlobalVar.Guardian) && is_null(board[_i3].koma)) {
                            if (this.isSente) {
                                if (!in_array(_i3, GlobalVar.Dan_1st) && !in_array(_i3, GlobalVar.Dan_2nd)) {
                                    result.push(_i3);
                                }
                            } else {
                                if (!in_array(_i3, GlobalVar.Dan_9th) && !in_array(_i3, GlobalVar.Dan_8th)) {
                                    result.push(_i3);
                                }
                            }
                        }
                    }
                    break;

                default:
                    for (var _i4 = 11; _i4 <= 99; _i4++) {
                        if (!in_array(_i4, GlobalVar.Guardian) && is_null(board[_i4].koma)) {
                            result.push(_i4);
                        }
                    }
                    break;
            }
            this.moveArea = result;
        }
    }]);

    return Piece;
}();

exports.default = Piece;

/***/ }),

/***/ "./assets/sass/app.scss":
/*!******************************!*\
  !*** ./assets/sass/app.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map