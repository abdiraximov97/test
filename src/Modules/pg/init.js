const { generateCrypt } = require("../bcrypt.js");

module.exports = async function init(db) {

    const count = await db.users.count();

    if(count === 0) {
        const superAdmin = await db.users.create({
            user_login: process.env.ADMIN_LOGIN,
            user_password: generateCrypt(process.env.ADMIN_PASSWORD),
            user_name: process.env.ADMIN_NAME,
            user_email: process.env.ADMIN_EMAIL,
            user_gender: process.env.ADMIN_GENDER,
            user_phone: process.env.ADMIN_PHONE,
        })

        console.log(superAdmin);
    }
}
