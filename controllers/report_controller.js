const reportService = require('./services/report_service');
const Report = require('../models/Report');

class Report_controller {

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

}

module.exports = new Report_controller()
