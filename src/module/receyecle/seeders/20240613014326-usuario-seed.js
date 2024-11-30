'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = {tableName: 'usuario', schema: "public"};
    await queryInterface.bulkInsert(table, [{
      nome: 'Admin Master',
      senha: '$2a$10$6Y/slsVBvA1jTBjf0AZX8.g0t5EWhLZWGexbBV/yBczBicUfnTVwW',
      email: 'adminreceyecle@receyecle.com',
      telefone: '11999999999',
      flag_admin: true,
      id_empresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Pedro',
      senha: '$2a$10$2dg9DAutCmvDc7ZRnNr.begNFYzvvmdgzeAaTQos/vm3.defKmC2u',
      email: 'pedro@gmail.com',
      telefone: '22999999999',
      flag_admin: true,
      id_empresa: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Gustavo',
      senha: '$2a$10$wCnNZLQpgbL3NCK7nar4juaD444vNnL4JSNVAEwCLssA/o0Po3hsy',
      email: 'gustavo@gmail.com',
      telefone: '21999999999',
      flag_admin: false,
      id_empresa: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Naieli',
      senha: '$2a$10$16N15l5KTtOgONqzTKgljuvKFxXnIo3hv1CMJ0b9VOmrbNiMBaa7i',
      email: 'naieli@gmail.com',
      flag_admin: false,
      id_empresa: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  
  async down (queryInterface, Sequelize) {
    const table = {tableName: 'usuario', schema: "public"};
    await queryInterface.bulkDelete(table, null, {});
  }
};
