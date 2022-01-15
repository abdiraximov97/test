module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("admin", {
        user_id: {
            type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
        },
        user_login: {
            type: Sequelize.STRING(), 
            allowNull: false
        },
        user_password: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        },
    })
}