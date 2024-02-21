import { DataTypes } from "sequelize";

import { sequelize } from "../database/db.js";

const Role = sequelize.define("Role", {
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

export default Role;
