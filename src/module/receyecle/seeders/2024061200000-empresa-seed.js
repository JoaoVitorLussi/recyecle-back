'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'empresa', schema: "public"};
     await queryInterface.bulkInsert(table, 
      [
      {
        nome: 'Receyecle',
        cnpj: '69.192.315/0001-84',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Materiais recicláveis Gardin',
        cnpj: '76.849.516/0001-77',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    const table = {tableName: 'empresa', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
