const db = require('../../database/db');

class ReportService {

    // saveReportToDB(req, appointment) {
    //     const totalPlan = this.totalCounter(req);
    //     const personPerDayPlan = totalPlan * appointment.rows[0].duration;
    //     return (
    //         db.query(
    //             `
    //         INSERT INTO report
    //         (
    //             countriesPlan,
    //             regionsPlan,
    //             educationEntityPlan,
    //             sportsmenPlan,
    //             coachesPlan,
    //             referees_plan,
    //             others_plan,
    //             total_plan,
    //             person_per_day_plan,
    //             appointment_id
    //         )
    //         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    //         RETURNING
    //             reportId,
    //             countriesPlan,
    //             regionsPlan,
    //             educationEntityPlan,
    //             sportsmenPlan,
    //             coachesPlan,
    //             refereesPlan,
    //             othersPlan,
    //             totalPlan,
    //             personPerdayPlan,
    //             appointment_id
    //         `,
    //             [
    //                 req.body.members.countries,
    //                 req.body.members.regions,
    //                 req.body.members.educationEntity,
    //                 req.body.members.sportsmen,
    //                 req.body.members.coaches,
    //                 req.body.members.referees,
    //                 req.body.members.others,
    //                 totalPlan,
    //                 personPerDayPlan,
    //                 appointment.rows[0].appointment_id
    //             ])
    //     )
    // }

    // getReportsFromDB() {
    //     return (
    //         db.query(`
    //         SELECT
    //             report_id,
    //             countriesPlan,
    //             regionsPlan,
    //             educationEntityPlan,
    //             sportsmenPlan,
    //             coachesPlan,
    //             refereesPlan,
    //             othersPlan,
    //             totalPlan,
    //             personPerDayPlan,
    //             countriesFact,
    //             regionsFact,
    //             educationEntityFact,
    //             sportsmenFact,
    //             coachesFact,
    //             refereesFact,
    //             othersFact,
    //             totalFact,
    //             personPerDayFact,
    //             title,
    //             startDate,
    //             finishDate,
    //             country.countryName,
    //             region.regionName,
    //             town.townName,
    //             sportHallName,
    //             address
    //         FROM
    //             report
    //         INNER JOIN appointment
    //             ON report.appointment_id = appointment.appointment_id
    //         INNER JOIN country
    //             ON appointment.country_id = country.country_id
    //         INNER JOIN region
    //             ON appointment.region_id = region.region_id
    //         INNER JOIN town
    //             ON appointment.town_id = town.town_id
    //         INNER JOIN sportHall
    //             ON appointment.sportHall_id = sportHall.sportHall_id
    //         `)
    //     )
    // }

    totalCounter(req) {
        return (
            Number(req.body.members.sportsmen) +
            Number(req.body.members.coaches) +
            Number(req.body.members.referees) +
            Number(req.body.members.others)
        )
    }

    totalPlanCounter(req) {
        return (
            req.body.sportsmenPlan +
            req.body.coachesPlan +
            req.body.refereesPlan +
            req.body.othersPlan
        )
    }

    totalFactCounter(req) {
        return (
            req.body.sportsmenFact +
            req.body.coachesFact +
            req.body.refereesFact +
            req.body.othersFact
        )
    }
}

module.exports = new ReportService()
