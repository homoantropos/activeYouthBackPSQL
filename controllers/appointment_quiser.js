const db = require('../db');

class Appointment_quiser{

    async AllAppointmentsQuery()
    {
        const appointments = await db.query(`
            SELECT
                title,
                startDate,
                finishDate,
                country_name,
                region_name,
                town_name,
                sportHall_name
            FROM
                appointment
            INNER JOIN country
            ON appointment.country_id = country.country_id
            INNER JOIN region
            ON appointment.region_id = region.region_id
            INNER JOIN town
            ON appointment.town_id = town.town_id
            INNER JOIN sportHall
            ON appointment.sportHall_id = sportHall.sporthall_id
            ORDER BY startDate
            `);
        return appointments;
    }
}

 module.exports = new Appointment_quiser()
