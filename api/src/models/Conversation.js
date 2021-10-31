const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "conversation",
    {
      members: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: false }
  );
};
