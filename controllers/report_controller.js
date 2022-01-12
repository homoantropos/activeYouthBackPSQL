const db = require('../database/db');
const reportService = require('./services/report_service');
const Report = require('../models/Report');

class Report_controller {

    async createReport(req, res, appointment) {
        try {
            const totalPlan = this.totalCounter(req);
            const personPerDayPlan = totalPlan * appointment.rows[0].duration;
            const report = await db.query(`
                INSERT INTO report 
                (
                    countriesPlan,
                    regionsPlan,
                    educationEntityPlan,
                    sportsmenPlan,
                    coachesPlan,
                    refereesplan,
                    othersplan,
                    totalPlan,
                    personPerDayPlan,
                    appointmentId
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING
                    reportId,
                    countriesPlan,
                    regionsPlan,
                    educationEntityPlan,
                    sportsmenPlan,
                    coachesPlan,
                    refereesplan,
                    othersplan,
                    totalplan,
                    personPerDayPlan,
                    appointmentId
            `,
                [
                    req.body.members.contries,
                    req.body.members.regions,
                    req.body.members.educationEntity,
                    req.body.members.sportsmen,
                    req.body.members.coaches,
                    req.body.members.referees,
                    req.body.members.others,
                    totalPlan,
                    personPerDayPlan,
                    req.body.appointmentId
                ]);
            res.status(201).json(report.rows[0]);

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateReport(req, res) {
        try {

            const totalPlan = reportService.totalPlanCounter(req);
            const personPerDayPlan = totalPlan*req.body.appointment.duration;
            const totalFact = reportService.totalFactCounter(req);
            const personPerDayFact = totalFact*req.body.appointment.duration;
            const report = await Report.update({
                countriesPlan: req.body.countriesPlan,
                regionsPlan: req.body.regionsPlan,
                educationEntityPlan: req.body.educationEntityPlan,
                sportsmenPlan: req.body.sportsmenPlan,
                coachesPlan: req.body.coachesPlan,
                refereesPlan: req.body.refereesPlan,
                othersPlan: req.body.othersPlan,
                totalPlan,
                personPerDayPlan,
                countriesFact: req.body.countriesFact,
                regionsFact: req.body.regionsFact,
                educationEntityFact: req.body.educationEntityFact,
                sportsmenFact: req.body.sportsmenFact,
                coachesFact: req.body.coachesFact,
                refereesFact: req.body.refereesFact,
                othersFact: req.body.othersFact,
                totalFact: totalFact,
                personPerDayFact: personPerDayFact
            }, {where: {id: req.body.id}});
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }


    async getAllReports(req, res) {
        try {
            const reports = await Report.scope('fullReport').findAll();
            res.status(200).json(reports);
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
            const report = await Report.scope('fullReport').findOne({
                where: {id: req.params.id}
            });
            res.status(200).json(report);
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

    totalCounter (req) {
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
