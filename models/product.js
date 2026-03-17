const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class Product extends Model {}

Product.init(
  {
    id: {
        allowNull: false,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ProductImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ProductDescription: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Product', // We need to choose the model name
  },
 );

module.exports = Product;
