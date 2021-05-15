'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Song, User, UsersBands }) {
      // define association here
      this.hasMany(Song, { foreignKey: 'bandId', as: 'songs'});
      this.belongsToMany(User, {
        through: UsersBands
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  };
  Band.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url_yt: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bands',
    modelName: 'Band',
  });
  return Band;
};