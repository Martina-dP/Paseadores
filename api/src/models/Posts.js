const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "post",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        description: {
        type: DataTypes.TEXT
      },
        image: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
  );
};
