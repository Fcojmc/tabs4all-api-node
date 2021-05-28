'use strict';

import { IBand } from '../../interfaces/IBand';

import {
  Model, UUIDV4
} from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Band extends Model<IBand> 
  implements IBand {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    uuid!: string;
    name!: string;
    image!: string;
    url_yt!: string;
    
    static associate(models: any) {
      // define association here
     
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  Band.init({
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
    url_yt: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Tab',
    tableName: 'tabs'
  });
  return Band;
};