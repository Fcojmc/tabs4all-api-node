'use strict';

import db from './index';

import { IUser } from '../../interfaces/IUser';

import {
  Model, UUIDV4
} from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUser> 
  implements IUser {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:   string;
    uuid!: string;
    name!: string;
    email!: string;
    password!: string;
    image!: string;
    is_admin!: boolean;
    
    static associate(models: any) {
      // define association here
      this.hasMany(db.Tab, { foreignKey: 'userId', as: 'tabs' });
      this.belongsToMany(db.Tab, { as: 'favouriteTabs', through: db.UsersTabs });
      this.belongsToMany(db.Band, { as: 'favouriteBands', through: db.UsersBands });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
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
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};