module.exports = (sequelize, DataTypes) => {
  const assignedPerms = sequelize.define("assignedPerms", {
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return assignedPerms;
};
