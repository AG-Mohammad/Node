module.exports = (sequelize, DataTypes) => {
  const complaints = sequelize.define("complaints", {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complainType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferedLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedByUserId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return complaints;
};
