const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "image",
    {
      public_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      imageURL: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};
