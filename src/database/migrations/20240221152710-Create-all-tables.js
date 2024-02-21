/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("roles", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.DataTypes.INTEGER,
            },
            title: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
        });
        await queryInterface.createTable("users", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.DataTypes.INTEGER,
            },
            login: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING(500),
                allowNull: false,
            },
            roleId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "roles",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: true,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
        await queryInterface.dropTable("roles");
    },
};
