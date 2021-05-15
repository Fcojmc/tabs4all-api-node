'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band }) {
      // define association here
      this.belongsTo(Band, { 
        foreignKey: 'bandId',
        as: 'band',
        onDelete: 'CASCADE' 
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, bandId: undefined }
    }
  };
  Song.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'songs',
    modelName: 'Song',
  });
  return Song;
};