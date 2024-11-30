'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = {tableName: 'material', schema: "public"};
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classificacao: {
        type: Sequelize.STRING
      },
      classificacao_usuario: {
        type: Sequelize.STRING
      },
      base_64: {
        type: Sequelize.STRING
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    const table = {tableName: 'material', schema: "public"};
    await queryInterface.dropTable(table);
  }
};
