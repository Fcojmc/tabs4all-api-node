'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Tab, UsersTabs, UsersBands }) {
      // define association here
      this.hasMany(Tab, { foreignKey: 'userId', as: 'tabs' });
      this.belongsToMany(Tab, { as: 'favouriteTabs', through: UsersTabs });
      this.belongsToMany(Band, { as: 'favouriteBands', through: UsersBands });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };

  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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