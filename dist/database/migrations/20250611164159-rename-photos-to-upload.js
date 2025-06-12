"use strict";'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('photos', 'upload');
  },

  async down(queryInterface) {
    await queryInterface.renameTable('upload', 'photos');
  },
};
