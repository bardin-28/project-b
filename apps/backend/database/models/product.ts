import { DataTypes, Model } from 'sequelize'
import sequelize from '@/database'
import { ProductInstance } from '@/src/routes/products/types'
import Restaurant from '@/database/models/restaurant'
import Storage from '@/database/models/storage'

export interface ProductInstanceInt
  extends Model<ProductInstance>,
    ProductInstance {}

const Product = sequelize.define<ProductInstanceInt>('Product', {
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ownerType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expired_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

Product.belongsTo(Restaurant, {
  foreignKey: 'ownerId',
})

Product.belongsTo(Storage, {
  foreignKey: 'ownerId',
})

export default Product
