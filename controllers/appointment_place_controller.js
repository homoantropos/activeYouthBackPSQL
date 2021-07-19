const AppointmentPlace = require('../models/AppointmentPlace');
const Town = require('../models/Town');
const Region = require('../models/Region');

class Appointment_place_controller {

    async createAppointmentPlace(req, res) {
        try {

            const town = await Town.findOne({
                where: {
                    townName: req.body.town.townName},
                attributes: {exclude: ['townName']},
                include: {
                    model: Region,
                    attributes: ['countryId']
                }
            });

            const candidate = await town.createAppointmentPlace({
                appointmentPlaceName: req.body.appointmentPlaceName,
                address: req.body.address,
                countryId: town.region.countryId,
                regionId: town.regionId,
                townId: town.id
            });
            const appointmentPlace = await AppointmentPlace
                .scope('appointmentPlace').findOne({
                    where: {id: candidate.id}
                });
            res.status(200).json({
                appointmentPlace,
                message: `${appointmentPlace.appointmentPlaceName} успішно додано до бази даних.`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateAppointmentPlace(req, res) {
        try {
            const town = await Town.findOne({
                where: {townName: req.body.town.townName},
                attributes: {exclude: ['townName']},
                include: {
                    model: Region,
                    attributes: ['countryId']
                }
            });
            await AppointmentPlace.update({
                appointmentPlaceName: req.body.appointmentPlaceName,
                address: req.body.address,
                countryId: town.region.countryId,
                regionId: town.regionId,
                townId: town.id},
            {where: {id: req.params.id}}
            );
            const appointmentPlace= await AppointmentPlace.scope('appointmentPlace').findOne({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                appointmentPlace,
                message: 'Зміни успішно збережені!'
            });
        } catch
            (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteAppointmentPlace(req, res) {
        try {
            await AppointmentPlace.destroy({
                where: {id: req.params.id}
            });
            res.status(200).json({
                message: 'Місце проведення успішно видалене з бази даних!'
            });
        } catch
            (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllPlaces(req, res) {
        try {
            const appointmentPlace = await AppointmentPlace.scope('appointmentPlace').findAll();
            res.status(200).json(appointmentPlace);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneAppointmentPlaceById(req, res) {
        try {
            const appointmentPlace = await AppointmentPlace.scope('appointmentPlace')
                .findOne({where: {id: req.params.id}});
            res.status(200).json(appointmentPlace);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Appointment_place_controller()
