const db = require('../db');
const reportService = require('./services/report_service');

class Report_controller {

    async createReport(req, res, appointment) {
        try {
            const total_plan = this.total_counter(req);
            console.log('total', total_plan);
            const person_per_day_plan = total_plan * appointment.rows[0].duration;
            console.log('personPD', person_per_day_plan);
            console.log('duration', appointment.rows[0].duration);
            const report = await db.query(`
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
                    req.body.members.contries,
                    req.body.members.regions,
                    req.body.members.educationEntity,
                    req.body.members.sportsmen,
                    req.body.members.coaches,
                    req.body.members.referees,
                    req.body.members.others,
                    total_plan,
                    person_per_day_plan,
                    appointment.rows[0].appointment_id
                ]);
            console.log('report', report.rows[0]);
            //res.status(201).json(report.rows[0]);

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateReport(req, res) {
        try {
            const duration = await db.query(`
                SELECT duration
                FROM appointment
                WHERE title = $1
            `, [req.body.title]);
            const total_plan = reportService.total_plan_counter(req);
            const person_per_day_plan = total_plan*duration.rows[0].duration;
            const total_fact = reportService.total_fact_counter(req);
            const person_per_day_fact = total_fact*duration.rows[0].duration;
            const report = await db.query(`
                UPDATE report
                SET
                countries_plan = $1,
                regions_plan = $2,
                educationEntity_plan = $3,
                sportsmen_plan = $4,
                coaches_plan = $5,
                referees_plan = $6,
                others_plan = $7,
                total_plan = $8,
                person_per_day_plan = $9,
                countries_fact = $10,
                regions_fact = $11,
                educationEntity_fact = $12,
                sportsmen_fact = $13,
                coaches_fact = $14,
                referees_fact = $15,
                others_fact = $16,
                total_fact = $17,
                person_per_day_fact = $18
                where report_id = $19
            `,
            [
                req.body.countries_plan,
                req.body.regions_plan,
                req.body.educationEntity_plan,
                req.body.sportsmen_plan,
                req.body.coaches_plan,
                req.body.referees_plan,
                req.body.others_plan,
                total_plan,
                person_per_day_plan,
                req.body.countries_fact,
                req.body.regions_fact,
                req.body.educationEntity_fact,
                req.body.sportsmen_fact,
                req.body.coaches_fact,
                req.body.referees_fact,
                req.body.others_fact,
                total_fact,
                person_per_day_fact,
                req.body.report_id
            ]);
            res.status(200).json(report.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllReports(req, res) {
        try {
            const reports = await reportService.getReportsFromDB();
            res.status(200).json(reports.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getReportsByActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getReportsByKindOfStudent(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getReportsByDate(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getReportsByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneReportById(req, res) {
        try {
            const report_id = Number(req.params.id);
            const reports = await reportService.getReportsFromDB();
            const report = reports.rows.filter(row => row.report_id === report_id);
            res.status(200).json(report[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteReport(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
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

module.exports = new Report_controller()
