const connection = require('../../config/db');

class HomeController {

    getHome = (req, res) => {
        res.status(200).json("ESTE ES EL HOME");
    }
}

module.exports = new HomeController();