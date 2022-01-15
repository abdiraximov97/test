module.exports = function PermissionChecker(permission_name, permissions, error) {
    let permission = permissions.find((x) => {
        if(Array.isArray(permission_name)) {
            return permission_name.includes(x["permission.permission.name"]);
        } else {
            return x["permission.permission.name"] == permission_name; 
        }
    });

    if(!permission) throw new error(401, "Kirish uchun sizga ruxsat yo'q!");
}