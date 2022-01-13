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
                countryName,
                regionName,
                townName,
                sportHallName,
                organizationsParticipants,
                sportKind,
                kpkv,
                haracter,
                participants,
                direction,
                status,
                organiser,
                appointmentId,
                address,
                personId
            FROM
                appointment
            INNER JOIN country
            ON appointment.countryId = country.countryId
            INNER JOIN region
            ON appointment.regionId = region.regionId
            INNER JOIN town
            ON appointment.townId = town.townId
            INNER JOIN sportHall
            ON appointment.sportHallId = sportHall.sporthallId
            INNER JOIN sportKind
            ON appointment.sportkindId = sportKind.id
            ORDER BY startDate
            `)
    )
    }
}

 module.exports = new Appointment_service()
