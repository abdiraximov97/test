
module.exports = async function (db) {
	await db.users.hasMany(db.sessions, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});
}