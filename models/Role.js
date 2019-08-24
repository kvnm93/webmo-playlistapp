'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  Role.associate = function(models) {
    models.role.belongsToMany(models.user, {
        through: 'userRole',
        as: 'users'
    })
  };
  return Role;
};