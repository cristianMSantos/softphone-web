'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Master',
        email: 'master@admin.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'master@admin.com' });
  }
};
