'use strict';
module.exports = (sequelize, DataTypes) => {
  var cmn_battle_tower = sequelize.define('cmn_battle_tower', {
    player_id: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    keep_win: DataTypes.INTEGER,
    keep_lose: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true
  });
  cmn_battle_tower.associate = function(models) {
    // associations can be defined here
  };
  return cmn_battle_tower;
};