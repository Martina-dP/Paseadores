const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "message",
    {
      conversationId: {
        type: DataTypes.STRING,
      },
      sender: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );
};
