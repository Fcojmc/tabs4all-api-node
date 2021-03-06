'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, UsersTabs }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.belongsToMany(User, { through: UsersTabs });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined}
    }
  };
  Tab.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
    tableName: 'tabs',
    modelName: 'Tab',
  });
  return Tab;
};