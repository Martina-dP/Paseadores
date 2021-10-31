const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "orden",
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
    estadoReserva: {
        type: DataTypes.ENUM("pendiente", "confirmada", "rechazada"),
        defaultValue: "pendiente",
        allowNull: false,
        },
    fechaInicio:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    fechaFinal:{
        type: DataTypes.STRING,
        allowNull: false,
      },    
    color: {
        type:DataTypes.STRING,
        defaultValue: "yellow"
    },
    ubicacion:{
        type: DataTypes.STRING,
        defaultValue: "yellow"
    }
    
    },
    { timestamps: false }
  );
};