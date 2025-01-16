import { Model, DataTypes } from 'sequelize'
import sequelize from '@/database'
import Restaurant from './restaurant'
import Storage from './storage'
import { UserInstance } from '@/src/shared/types'

export type UserType = UserInstance & Model

const User = sequelize.define<UserType>(
  'User',
  {
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
    restaurantId: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurant,
        key: 'id',
      },
    },
    storageId: {
      type: DataTypes.INTEGER,
      references: {
        model: Storage,
        key: 'id',
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    hooks: {
      afterFind(users) {
        if (Array.isArray(users)) {
          users.forEach((user) => {
            if (user.restaurantId === null) {
              delete user.restaurantId
            }
            if (user.storageId === null) {
              delete user.storageId
            }
          })
        }
      },
    },
  },
)

User.belongsTo(Restaurant, { foreignKey: 'restaurantId' })
User.belongsTo(Storage, { foreignKey: 'storageId' })
Restaurant.hasMany(User, { foreignKey: 'restaurantId' })
Storage.hasMany(User, { foreignKey: 'storageId' })

export default User
