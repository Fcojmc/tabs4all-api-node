'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class UsersTabs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models: any) {
      // define association here
     
    }

  };
  UsersTabs.init({

  }, {
    sequelize,
    modelName: 'UsersTabs',
    tableName: 'users_tabs'
  });
  return UsersTabs;
};