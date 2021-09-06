module.exports = (sequelize, DataTypes) => {
    const Permissions = sequelize.define("Permissions", {
      UserID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      ViewComp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      CreatComp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  
    return Permissions;
  };