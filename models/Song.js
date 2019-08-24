'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('song', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    length: DataTypes.INTEGER,
    album: DataTypes.STRING,
  }, {
    timestamps: false,
    freezeTableName: true
  });
  Song.associate = function(models) {
    models.song.belongsToMany(models.playlist, {
        through: 'playlistSong',
        as: 'playlists'
    });
  };
  return Song;
};