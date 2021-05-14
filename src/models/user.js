'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Tab }) {
      // define association here
      this.hasMany(Tab, { foreignKey: 'userId', as: 'tabs' });
      this.belongsToMany(Tab, { as: 'favouriteTabs', through: 'users_tabs' });
      this.belongsToMany(Band, { as: 'favouriteBands', through: 'users_bands' });
    }
  };

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'This field is mandatory.' },
        notEmpty: { message: 'Name must not be empty.' },
      }
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { message: 'This field is mandatory.' },
        notEmpty: { message: 'Email must not be empty.' },
        isEmail: { message: 'Email is not valid.' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { message: 'Password is mandatory.' },
        notEmpty: { message: 'Password must not be empty' },
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });

  return User;
};