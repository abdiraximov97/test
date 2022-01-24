module.exports = async function AdminMiddleware(req, res, next) {
    try {
        if(req.role != "admin") {
            throw new res.error(401, "Siz uchun ruxsat yo'q");
        }

        next();
    } catch (error) {
        console.log("AdminMiddleware Error: ", error);
        next(error);
    }
}