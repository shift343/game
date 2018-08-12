//モデル読み込み
const models = require('../../../../models');
const player_info = models.ply_player_info;

module.exports = {

    // 対局情報を元にプレイヤー情報取得
    getPlayerInfoByMatchingInfo : (matchingInfo) => {
        return new Promise((resolve, reject) => {
            let result = {};

            player_info.findOne({ where:{
                id: matchingInfo.sente
            }}).then(value =>{
                result.sente = value;

                // あとで入れ子構造やめる
                player_info.findOne({ where:{
                    id: matchingInfo.gote
                }}).then(value =>{
                    result.gote = value;
                    resolve(result)
                });
            });
        });
    }
}
