'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class UsersBands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models: any) {
      // define association here
     
    }

  };
  UsersBands.init({

  }, {
    sequelize,
    modelName: 'UsersBands',
    tableName: 'users_bands'
  });
  return UsersBands;
};