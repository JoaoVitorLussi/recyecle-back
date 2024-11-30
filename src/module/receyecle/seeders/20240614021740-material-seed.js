'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'material', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      classificacao: 'Vidro',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Vidro',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Papelão',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Plástico',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Metal',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Vidro',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Plástico',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Metal',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Lixo',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      classificacao: 'Papel',
      id_usuario: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    const table = {tableName: 'material', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
