'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Material.belongsTo(models.Usuario,{foreignKey:'id_usuario'});
    }
  }
  Material.init({
    classificacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classificacao_usuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    base_64: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Material',
    tableName: 'material'
  });
  return Material;
};