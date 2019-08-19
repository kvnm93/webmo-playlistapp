'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'role',
    freezeTableName: true,
    underscored: true,
      timestamps: false,
  });
  Role.associate = function(models) {
    models.role.belongsToMany(models.user, {
        through: {
          model: models.user_role
        },
        as: "User",
        foreignKey: 'role_id'
    })
  };
  return Role;
};