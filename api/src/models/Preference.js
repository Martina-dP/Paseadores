const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "preference",
    {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
          
          },
        turno: {
            type: DataTypes.ENUM("Full", "Mañana", "Tarde/Noche"),
            allowNull: false,
            defaultValue: "Full",

        },
        dias_trabajo: {
            type: DataTypes.ENUM("LD", "LV", "W"),
            allowNull: false,
            defaultValue: "LD",

        },         
        perros_por_paseo:{
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5
        },
        duracion_paseos: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "01:00",
        },
        comienzo_jornada:{
          type: DataTypes.STRING
        },
        fin_jornada:{
          type: DataTypes.STRING
        }
    },
    { timestamps: false }
  );
};