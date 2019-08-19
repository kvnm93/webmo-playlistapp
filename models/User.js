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
    tableName: 'user',
    freezeTableName: true,
    underscored: true
  });
  User.associate = function(models) {
    models.user.belongsToMany(models.role, {
        through: {
            model: models.user_role
        },
        as: 'Role',
        foreignKey: 'user_id'
    });
    models.user.belongsToMany(models.playlist, {
        through: {
            model: models.playlist_follower
        },
        as: 'UserPlaylistFollow',
        foreignKey: 'user_id'
    });
    models.user.hasMany(models.playlist, {
        as: 'UserPlaylistCreator',
        foreignKey: 'creator'
    });
  };
  return User;
};