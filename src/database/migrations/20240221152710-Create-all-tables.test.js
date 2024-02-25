/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
        await queryInterface.dropTable("roles");
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
            bossId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "users",
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
        await queryInterface.bulkInsert(
            "roles",
            [
                { title: "ADMIN", createdAt: new Date(), updatedAt: new Date() },
                { title: "BOSS", createdAt: new Date(), updatedAt: new Date() },
                { title: "USER", createdAt: new Date(), updatedAt: new Date() },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
        await queryInterface.dropTable("roles");
    },
};
