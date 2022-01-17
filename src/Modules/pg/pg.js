const { Sequelize } = require("sequelize");
const init = require("./init");
const Relations = require("../../Models/Relations");
const SessionsModel = require("../../Models/SessionsModel");
const UserModel = require("../../Models/UserModel");
const AdminModel = require("../../Models/AdminModels");

if(!process.env.PG_URL) {
    throw new Error("PG URL NOT FOUND");
}

const sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
});

module.exports = async function pg() {
    try {
        await sequelize.authenticate();

		let db = {};

        db.sessions = await SessionsModel(sequelize, Sequelize);
        db.users = await UserModel(sequelize, Sequelize);
        db.admin = await AdminModel(sequelize, Sequelize);

       await Relations(db);

        await sequelize.sync({
            force: true,
        });
        await init(db);

        return db;

        
    } catch (error) {
        console.log("SQL_ERROR:", error);
    }
}