const users = [{
  login: 'JaneDoe',
  password: 'qwerty1234',
  UUID: 'b882bf32-d54c-4be5-a9c7-42ce1825b35c',
  isDeleted: false,
  age: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  login: 'JonDoe',
  password: 'qwerty4321',
  UUID: 'b882bf32-d54c-4be5-a9c7-42ce1825b35b',
  isDeleted: false,
  age: 20,
  createdAt: new Date(),
  updatedAt: new Date(),
}];

// export const up = (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', users, {});
// export const down = (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {});

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', users, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
