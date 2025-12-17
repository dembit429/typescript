'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('products', [
  {
    id: 'b4c5f9e4-63ff-44c7-9d50-b59bca92c123',
    brand: 'Casio',
    model: 'F91W',
    price: 1999,
    category_id: 'f1a1c4a2-bd2c-4b0d-a39d-e0f621aad5c1',
    created_at: new Date(),
    updated_at: new Date(),
  },
]);

  },

  async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
  }
};
