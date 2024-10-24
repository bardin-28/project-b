import { DataTypes } from 'sequelize';
import sequelize from "@/database";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;
