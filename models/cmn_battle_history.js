'use strict';
module.exports = (sequelize, DataTypes) => {
  var cmn_battle_history = sequelize.define('cmn_battle_history', {
    sente: DataTypes.INTEGER,
    gote: DataTypes.INTEGER,
    result: DataTypes.INTEGER,
    record_json: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true
  });
  cmn_battle_history.associate = function(models) {
    // associations can be defined here
  };
  return cmn_battle_history;
};