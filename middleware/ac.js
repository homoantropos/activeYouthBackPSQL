const Role = require('../models/Role');

module.exports.getRoleId =
    async function (code) {
        try {
            const role = await Role.findOne({
                where: {
                    code
                }
            })
            return role.role;
        } catch (error) {
            return error;
        }

    }
