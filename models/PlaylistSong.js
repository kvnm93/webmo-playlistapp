'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistSong = sequelize.define('playlist_song', {
    playlist_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'playlist_song',
    freezeTableName: true,
    underscored: true
  });
  PlaylistSong.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistSong;
};