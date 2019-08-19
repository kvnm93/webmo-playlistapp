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
    tableName: 'song',
    freezeTableName: true,
    underscored: true
  });
  Song.associate = function(models) {
    models.song.belongsToMany(models.playlist, {
        through: {
            model: models.playlist_song
        },
        as: 'SongPlaylist',
        foreignKey: 'song_id'
    });
  };
  return Song;
};