'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Empresa, {
        foreignKey: 'id_empresa',
        as: 'empresa'
      });
    }
  }
  Usuario.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
  });
  return Usuario;
};