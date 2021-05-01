const db = require('../database/db');
const appointmentService = require('./services/appointment_service');
const reportService = require('./services/report_service');
const User = require('../models/User');

class Appointment_controller {

    async createAppointment(req, res) {
        try {
            const country_id = await db.query(`
                  SELECT country_id
                  FROM country
                  WHERE country_name = ($1)`,
                  [req.body.place.country]);
            const region_id = await db.query(`
                  SELECT region_id
                  FROM region
                  WHERE region_name = ($1)`,
                  [req.body.place.region]);
            const town_id = await db.query(`
                  SELECT town_id
                  FROM town
                  WHERE town_name = ($1)`,
                  [req.body.place.town]);
            const sportHall_id = await db.query(`
                  SELECT sportHall_id
                  FROM sportHall
                  WHERE sportHall_name = ($1)`,
                  [req.body.place.sportHall]);

            const sportkind_id = await db.query(`
                  SELECT sportkind_id
                  FROM sportKind
                  WHERE name = ($1)`,
                  [req.body.sportKind]);
            const user = await User.findOne({
                where: {
                    email: req.user.email
                }
            });

            const startDate = new Date(req.body.start);
            const finishDate = new Date(req.body.finish);
            const appointment = await db.query(`
                  INSERT INTO appointment
                  (title,
                   startDate,
                   finishDate,
                   duration,
                   country_id,
                   region_id,
                   town_id,
                   sportHall_id,
                   organizationsParticipants,
                   sportkind_id,
                   kpkv,
                   haracter,
                   participants,
                   direction,
                   status,
                   organiser,
                   person_id)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                  RETURNING
                   title,
                   startDate,
                   finishDate,
                   duration,
                   country_id,
                   region_id,
                   town_id,
                   sportHall_id,
                   organizationsParticipants,
                   sportKind_id,
                   kpkv,
                   haracter,
                   participants,
                   direction,
                   status,
                   organiser,
                   person_id,
                   appointment_id`,
                  [req.body.title,
                      startDate, finishDate, req.body.duration,
                      country_id.rows[0].country_id, region_id.rows[0].region_id,
                      town_id.rows[0].town_id, sportHall_id.rows[0].sporthall_id,
                      req.body.organizationsParticipants,
                      sportkind_id.rows[0].sportkind_id,
                      req.body.kpkv,
                      req.body.character,
                      req.body.participants,
                      req.body.direction,
                      req.body.status,
                      req.body.organiser,
                      user.id
                  ]);
            const report = await reportService.saveReportToDB(req, appointment);
            console.log('report', report.rows[0]);
            res.status(201).json(appointment.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateAppointment(req, res) {
        try {
            const country_id = await db.query(`
                  SELECT country_id
                  FROM country
                  WHERE country_name = ($1)`,
                [req.body.place.country]);

            const region_id = await db.query(`
                  SELECT region_id
                  FROM region
                  WHERE region_name = ($1)`,
                [req.body.place.region]);

            const town_id = await db.query(`
                  SELECT town_id
                  FROM town
                  WHERE town_name = ($1)`,
                [req.body.place.town]);

            const sportHall_id = await db.query(`
                  SELECT sportHall_id
                  FROM sportHall
                  WHERE sportHall_name = ($1)`,
                [req.body.place.sportHall]);

            const sportkind_id = await db.query(`
                  SELECT sportkind_id
                  FROM sportKind
                  WHERE name = ($1)`,
                [req.body.sportKind]);

            console.log(req.user)

            const user = await User.findOne({
                where: {
                    email: req.user.email
                }
            })

            const startDate = new Date(req.body.start);
            const finishDate = new Date(req.body.finish);
            const appointment = await db.query(`
                  UPDATE appointment
                  SET
                   title = $1,
                   startDate = $2,
                   finishDate = $3,
                   duration = $4,
                   country_id = $5,
                   region_id = $6,
                   town_id = $7,
                   sportHall_id = $8,
                   organizationsParticipants = $9,
                   sportkind_id = $10,
                   kpkv = $11,
                   haracter = $12,
                   participants = $13,
                   direction = $14,
                   status = $15,
                   organiser = $16,
                   person_id = $17
                  WHERE appointment_id = ($18)
                  RETURNING
                   title,
                   startDate,
                   finishDate,
                   duration,
                   country_id,
                   region_id,
                   town_id,
                   sportHall_id,
                   organizationsParticipants,
                   sportKind_id,
                   kpkv,
                   haracter,
                   participants,
                   direction,
                   status,
                   organiser,
                   person_id`,
                [req.body.title,
                    startDate, finishDate, req.body.duration,
                    country_id.rows[0].country_id, region_id.rows[0].region_id,
                    town_id.rows[0].town_id, sportHall_id.rows[0].sporthall_id,
                    req.body.organizationsParticipants,
                    sportkind_id.rows[0].sportkind_id,
                    req.body.kpkv,
                    req.body.character,
                    req.body.participants,
                    req.body.direction,
                    req.body.status,
                    req.body.organiser,
                    user.id,
                    req.body.appointment_id
                ]);
            res.status(201).json(appointment.rows[0]);

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllAppointments(req, res) {
        try {
            const appointments =  await appointmentService.AllAppointmentsQuery();
            res.status(200).json(appointments.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getCalendar(req, res) {
        try{
            const calendar = await db.query(`
                SELECT * FROM appointment
                NATURAL JOIN report
                NATURAL JOIN country
                NATURAL JOIN region
                NATURAL JOIN town
                NATURAL JOIN sportKind;
            `);
            res.status(200).json(calendar.rows);
        } catch(error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByActivity(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByParticipantsType(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByDate(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAppointmentsByUserId(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneAppointmentById(req, res) {
        try {
            const appointment_id = Number (req.params.id);
            const appointments =  await appointmentService.AllAppointmentsQuery();
            const appointment = appointments.rows.filter(row => row.appointment_id === appointment_id);
            res.status(200).json(appointment[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteAppointment(req, res) {
        try {
            await db.query(`DELETE FROM appointment WHERE appointment_id = ($1)`, [req.params.id]);
        res.status(201).json({
            message: `Захід успішно видалено з бази даних.`
        });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Appointment_controller()
