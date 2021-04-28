const db = require('../../database/db');

class Appointment_service {

    async AllAppointmentsQuery() {
        return (
            await db.query(`
            SELECT
                title,
                startDate,
                finishDate,
                duration,
                country_name,
                region_name,
                town_name,
                sportHall_name,
                organizationsParticipants,
                name,
                kpkv,
                haracter,
                participants,
                direction,
                status,
                organiser,
                appointment_id,
                address,
                person_id
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
            INNER JOIN sportkind
            ON appointment.sportkind_id = sportkind.sportkind_id
            ORDER BY startDate
            `)
    )
    }
}

 module.exports = new Appointment_service()
