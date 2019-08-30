'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  });
  User.associate = function(models) {
    models.user.belongsToMany(models.role, {
        through: 'userRole',
        as: 'roles',
        onDelete: 'CASCADE'
    });
    models.user.belongsToMany(models.playlist, {
        through: 'playlistUser',
        as: 'playlists',
        onDelete: 'CASCADE'
    });
    models.user.hasMany(models.playlist, {
        as: 'owner',
        onDelete: 'CASCADE'
    });
  };
  return User;
};