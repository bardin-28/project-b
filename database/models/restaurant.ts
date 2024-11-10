import { DataTypes } from 'sequelize'
import sequelize from '@/database'

const Restaurant = sequelize.define('Restaurant', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export default Restaurant
