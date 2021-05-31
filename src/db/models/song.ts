'use strict';

import db from './index';

import { ISong } from '../../interfaces/ISong';

import {
  Model, UUIDV4
} from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Song extends Model<ISong> 
  implements ISong {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    uuid!: string;
    name!: string;
    link!: string;
    
    static associate(models: any) {
      // define association here
      this.belongsTo(db.Band, { 
        foreignKey: 'bandId',
        as: 'band',
        onDelete: 'CASCADE' 
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  Song.init({
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
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Song',
    tableName: 'songs'
  });
  return Song;
};