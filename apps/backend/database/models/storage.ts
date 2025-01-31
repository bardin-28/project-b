import { DataTypes } from 'sequelize'
import sequelize from '@/database'

const Storage = sequelize.define('Storage', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

export default Storage
