'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creator: {
      type: DataTypes.INTEGER,
      model: 'user',
      key: 'id'
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'playlist',
    freezeTableName: true,
    underscored: true
  });
  Playlist.associate = function(models) {
    models.playlist.belongsTo(models.user, {
        foreignKey: 'id',
        as: "PlaylistCreator"
    });
    models.playlist.belongsToMany(models.user, {
        through: {
            model: models.playlist_follower
        },
        as: 'PlaylistFollower',
        foreignKey: 'playlist_id'
    });
    models.playlist.belongsToMany(models.song, {
        through: {
            model: models.playlist_song
        },
        as: 'PlaylistSong',
        foreignKey: 'playlist_id'
    });
  };
  return Playlist;
};