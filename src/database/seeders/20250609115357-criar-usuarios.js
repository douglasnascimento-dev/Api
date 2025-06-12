const bcrypt = require('bcryptjs');

const HASH_SALT_ROUNDS = 8;

module.exports = {

    async up (queryInterface) {

    return queryInterface.bulkInsert('users', [{
        name: 'Douglas',
        email: 'dg12@douglasnascimento.dev.br',
        password_hash: await bcrypt.hash('123456', HASH_SALT_ROUNDS),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Douglas',
        email: 'dg13@douglasnascimento.dev.br',
        password_hash: await bcrypt.hash('123456', HASH_SALT_ROUNDS),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Douglas',
        email: 'dg14@douglasnascimento.dev.br',
        password_hash: await bcrypt.hash('123456', HASH_SALT_ROUNDS),
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },
};
