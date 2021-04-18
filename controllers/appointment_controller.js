const db = require('../db');

class Appointment_controller {

    async createAppointment(req, res) {
        try {
            const country_id = await db.query(`
                  SELECT country_id
                  FROM country
                  WHERE country_name = ($1)`,
                  [req.body.country_name]);
            const region_id = await db.query(`
                  SELECT region_id
                  FROM region
                  WHERE region_name = ($1)`,
                  [req.body.region_name]);
            const town_id = await db.query(`
                  SELECT town_id
                  FROM town
                  WHERE town_name = ($1)`,
                  [req.body.town_name]);
            const sportHall_id = await db.query(`
                  SELECT sportHall_id
                  FROM sportHall
                  WHERE sportHall_name = ($1)`,
                  [req.body.sportHall_name]);
            console.log(sportHall_id.rows[0]);
            const sportKind_id = await db.query(`
                  SELECT _id
                  FROM sportKind
                  WHERE name = ($1)`,
                  [req.body.sportKind_name]);
            console.log('sportKind: ', sportKind_id.rows[0]);
            const person_id = await db.query (`
                  SELECT _id
                  FROM person
                  WHERE email = ($1)`,
                  [req.user.rows[0].email]);
            const place = await db.query(`
                  INSERT INTO place (countryId, regionId, townId, sportHallId)
                  VALUES ($1, $2, $3, $4)
                  RETURNING place_id, countryId, regionId, townId, sportHallId`,
                  [country_id.rows[0].country_id, region_id.rows[0].region_id, town_id.rows[0].town_id, sportHall_id.rows[0].sporthall_id]);
            const startDate = new Date(req.body.startDate);
            const finishDate = new Date(req.body.finishDate);
            const appointment = await db.query(`
                  INSERT INTO appointment
                  (title, startDate, finishDate, duration, placeId, organizationsParticipants, sportKindId, KPKV, haracter, participants,
                direction, status, organiser, personId)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                  RETURNING title, startDate, finishDate, duration, placeId, organizationsParticipants, sportKindId, KPKV, haracter, participants,
                direction, status, organiser, personId`,
                  [req.body.title, startDate, finishDate, req.body.duration, place.rows[0].place_id, req.body.organizationsParticipants,
                      sportKind_id.rows[0]._id, req.body.KPKV, req.body.character, req.body.participants, req.body.direction, req.body.status, req.body.organiser,
                      person_id.rows[0]._id
                  ]);
            res.status(201).json(appointment.rows[0]);

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateAppointment(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllAppointments(req, res) {
        try {

        } catch (error) {
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

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteAppointment(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Appointment_controller()
