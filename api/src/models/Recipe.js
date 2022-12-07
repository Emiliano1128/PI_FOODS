const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.TEXT
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.INTEGER,
    },
    steps:{
      type: DataTypes.TEXT
    },
    dishType:{
      type: DataTypes.TEXT
    },
    price:{
      type: DataTypes.REAL
    },
    createInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },{
    timestamps: false
  });
};
