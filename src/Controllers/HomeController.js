module.exports = class HomeController {
    static async HomeGetController(req, res, next) {
        try {
            res.json({
                ok: true,
            });
        } catch (error) {
            console.log("HomeGetController Error: ", error);
            next(error);
        }
    }
}