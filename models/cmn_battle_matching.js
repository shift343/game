'use strict';
module.exports = (sequelize, DataTypes) => {
  var cmn_battle_matching = sequelize.define('cmn_battle_matching', {
    status: DataTypes.INTEGER,
    player1: DataTypes.INTEGER,
    player2: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true
  });
  cmn_battle_matching.associate = function(models) {
    // associations can be defined here
  };
  return cmn_battle_matching;
};