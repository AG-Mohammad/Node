module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define("permissions", {
    permissionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return permissions;
};
