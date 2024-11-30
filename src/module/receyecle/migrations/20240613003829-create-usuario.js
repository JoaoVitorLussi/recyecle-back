'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = {tableName: 'usuario', schema: "public"};
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flag_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'empresa',
          key: 'id'
        },
      },
      deletedAt: {
        type: Sequelize.DATE
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
    const table = {tableName: 'usuario', schema: "public"};
    await queryInterface.dropTable(table);
  }
};