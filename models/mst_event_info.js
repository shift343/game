'use strict';
module.exports = (sequelize, DataTypes) => {
  var mst_event_info = sequelize.define('mst_event_info', {
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    type: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true
  });
  mst_event_info.associate = function(models) {
    // associations can be defined here
  };
  return mst_event_info;
};