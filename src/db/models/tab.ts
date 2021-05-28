'use strict';

import { ITab } from '../../interfaces/ITab';

import {
  Model, UUIDV4
} from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Tab extends Model<ITab> 
  implements ITab {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    uuid!: string;
    name!: string;
    content!: string;
    url_yt!: string;
    
    static associate(models: any) {
      // define association here
     
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  Tab.init({
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
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url_yt: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Tab',
    tableName: 'tabs'
  });
  return Tab;
};