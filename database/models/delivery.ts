import { DataTypes, Model } from 'sequelize'
import sequelize from '@/database'
import Product from '@/database/models/product'

export interface DeliveryInstance extends Model {
  id: number
  description: string
  status: 'pending' | 'in_transit' | 'delivered' | 'canceled'
  createdAt: Date
  updatedAt: Date
}

const Delivery = sequelize.define<DeliveryInstance>(
  'Delivery',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_transit', 'delivered', 'canceled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    timestamps: true,
  },
)

Delivery.belongsToMany(Product, {
  through: 'DeliveryProducts',
  foreignKey: 'deliveryId',
})

export default Delivery
