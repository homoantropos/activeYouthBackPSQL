const db = require('../../db');

class ReportService {

    saveReportToDB(req, appointment) {
        const total_plan = this.total_counter(req);
        const person_per_day_plan = total_plan * appointment.rows[0].duration;
        return (
            db.query(`
            INSERT INTO report 
            (
                countries_plan,
                regions_plan,
                educationEntity_plan,
                sportsmen_plan,
                coaches_plan,
                referees_plan,
                others_plan,
                total_plan,
                person_per_day_plan,
                appointment_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING
                report_id,
                countries_plan,
                regions_plan,
                educationEntity_plan,
                sportsmen_plan,
                coaches_plan,
                referees_plan,
                others_plan,
                total_plan,
                person_per_day_plan,
                appointment_id
            `,
            [
                req.body.members.countries,
                req.body.members.regions,
                req.body.members.educationEntity,
                req.body.members.sportsmen,
                req.body.members.coaches,
                req.body.members.referees,
                req.body.members.others,
                total_plan,
                person_per_day_plan,
                appointment.rows[0].appointment_id
            ])
        )
    }

    getReportsFromDB() {
        return (
            db.query(`
            SELECT
                report_id,
                countries_plan,
                regions_plan,
                educationEntity_plan,
                sportsmen_plan,
                coaches_plan,
                referees_plan,
                others_plan,
                total_plan,
                person_per_day_plan,
                countries_fact,
                regions_fact,
                educationEntity_fact,
                sportsmen_fact,
                coaches_fact,
                referees_fact,
                others_fact,
                total_fact,
                person_per_day_fact,
                title,
                startDate,
                finishDate,
                country.country_name,
                region.region_name,
                town.town_name,
                sportHall_name,
                address
            FROM
                report
            INNER JOIN appointment
                ON report.appointment_id = appointment.appointment_id
            INNER JOIN country
                ON appointment.country_id = country.country_id
            INNER JOIN region
                ON appointment.region_id = region.region_id
            INNER JOIN town
                ON appointment.town_id = town.town_id
            INNER JOIN sportHall
                ON appointment.sportHall_id = sportHall.sportHall_id
            `)
        )
    }

    total_counter (req) {
        return (
            Number(req.body.members.countries) +
            Number(req.body.members.regions) +
            Number(req.body.members.educationEntity) +
            Number(req.body.members.sportsmen) +
            Number(req.body.members.coaches) +
            Number(req.body.members.referees) +
            Number(req.body.members.others)
        )
    }
}

module.exports = new ReportService()
