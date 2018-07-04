'use strict';
module.exports = (sequelize, DataTypes) => {
  var ply_player_info = sequelize.define('ply_player_info', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    lose: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true
  });

  ply_player_info.associate = function(models) {
    // associations can be defined here
  };

  return ply_player_info;
};