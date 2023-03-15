const connection = require('../../config/db');

class HomeController {

    getHome = (req, res) => {
        res.status(200).json("VIVA EL CAÑAMO!!!");
    }
}

module.exports = new HomeController();