export default class Game {
    constructor(matchingInfo,own){
        // 対局情報
        this.roomId   = matchingInfo.roomId;
        this.ownId    = own.id;
        this.sente    = matchingInfo.sente.id;
        this.gote     = matchingInfo.gote.id;
        this.isSente  = this.ownId == this.sente ? true : false;
        this.isGote   = this.ownId == this.gote  ? true : false;

        // 進行状況
        this.battleStatus = 0;
    }
}