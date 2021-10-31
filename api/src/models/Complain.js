const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "complain",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};