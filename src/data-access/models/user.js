import sequelize from 'sequelize';

const { Model } = sequelize;

export default (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    UUID: DataTypes.UUID,
    isDeleted: DataTypes.BOOLEAN,
    age: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });

  console.log('User', User);

  return User;
};
