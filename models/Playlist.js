'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('playlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cover: DataTypes.STRING,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  Playlist.associate = function(models) {
    models.playlist.belongsTo(models.user, {
        as: "creator",
        onDelete: 'CASCADE'
    });
    models.playlist.belongsToMany(models.user, {
        through: 'playlistUser',
        as: 'followers',
        onDelete: 'CASCADE'
    });
    models.playlist.belongsToMany(models.song, {
        through: 'playlistSong',
        as: 'songs',
        onDelete: 'CASCADE'
    });
  };
  return Playlist;
};