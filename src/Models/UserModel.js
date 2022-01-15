module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("users", {
        user_id: {
            type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4(),
			primaryKey: true,
        },
        user_name: {
            type: Sequelize.STRING(64), 
            allowNull: false
        },
        user_password: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        },
        user_gender: {
			type: Sequelize.ENUM,
			values: ["male", "female"],
			allowNull: false,
		},
        user_phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
}