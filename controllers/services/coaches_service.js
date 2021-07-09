const Coach = require('../../models/Coach');

class Coaches_service {
    async getCoachFromDB(value) {
        const coach = await Coach.findOrCreate(
            {
                where: {
                    name: value.name,
                    surname: value.surname,
                    fathersName: value.fathersName
                }
            }
        );
        return coach[0];
    }
}

module.exports = new Coaches_service()
