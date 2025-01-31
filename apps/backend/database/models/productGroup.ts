import { DataTypes } from 'sequelize'
import sequelize from '@/database'
import Product from '@/database/models/product'

const ProductGroup = sequelize.define(
  'productGroup',
  {
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
)

ProductGroup.belongsToMany(Product, {
  through: 'ProductGroupProducts',
  foreignKey: 'productGroupId',
})

export default ProductGroup
