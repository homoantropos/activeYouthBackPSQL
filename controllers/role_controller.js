const Role = require('../models/Role');

class RoleController {
    async createRole(req, res) {
        try {

        }
        catch(error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new RoleController()
