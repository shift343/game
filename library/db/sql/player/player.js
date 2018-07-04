var connection = require('../../../../mysqlConnection'); // 追加
let query = null;

// const insertPlayerInfo = (player_name,password) => {   
//     query = 'INSERT INTO ply_user_info (player_name,password) VALUES ("' + player_name + '", ' + '"' + password + '")';
// };

//module.exports = insertPlayerInfo();

// ユーザー情報を登録する
exports.registerUserInfo = (player_name,password) => {
    query = 'INSERT INTO ply_user_info (player_name,password) VALUES ("' + player_name + '", ' + '"' + password + '")';
    connection.query(query, function(err, rows) {
        //callback関数
    });
};
