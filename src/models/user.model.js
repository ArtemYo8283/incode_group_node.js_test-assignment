import { DataTypes } from "sequelize";

import { sequelize } from "../database/db.js";

const User = sequelize.define("User", {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    bossId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

export default User;
