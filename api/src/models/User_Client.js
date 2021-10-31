const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user_client",
    {   
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        favourite:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        }, );
};



 /*
const User_Client = sequelize.define('User_Client', {
    favourite:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, );*/