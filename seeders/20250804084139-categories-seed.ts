'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        id: 'f1a1c4a2-bd2c-4b0d-a39d-e0f621aad5c1',
        watch_type: 'Digital',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'a3b2c7f8-dedf-4e2d-8832-0a33de21749d',
        watch_type: 'Analog',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
