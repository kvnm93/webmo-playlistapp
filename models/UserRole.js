'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('user_role', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  },
  {
    tableName: 'user_role',
    freezeTableName: true,
    underscored: true,
      timestamps: false,
  });
  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};