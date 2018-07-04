'use strict';
module.exports = (sequelize, DataTypes) => {
  var ply_player_friend = sequelize.define('ply_player_friend', {
    player_id: DataTypes.INTEGER,
    friend_id: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    lose: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true
  });
  ply_player_friend.associate = function(models) {
    // associations can be defined here
  };
  return ply_player_friend;
};