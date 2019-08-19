'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistFollower = sequelize.define('playlist_follower', {
    playlist_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'playlist_user',
    freezeTableName: true,
    underscored: true
  });
  PlaylistFollower.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistFollower;
};