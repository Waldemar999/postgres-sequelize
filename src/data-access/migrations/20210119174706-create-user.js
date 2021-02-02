module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    login: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    UUID: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    isDeleted: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
