module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("role", {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return role;
  };
  