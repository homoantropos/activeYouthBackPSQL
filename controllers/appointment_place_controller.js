const Appointment_place = require('../models/Appointment_place');
const Town = require('../models/Town');
const Region = require('../models/Region');

class Appointment_place_controller {

    async createAppointmentPlace(req, res) {
        try {
            const town = await Town.findOne({
                where: {town_name: req.body.town_name},
                attributes: {exclude: ['town_name']},
                include: {
                    model: Region,
                    attributes: ['countryId']
                }
            });
            const appointment_place = await town.createAppointment_place({
                appointment_place_name: req.body.appointment_place_name,
                address: req.body.address,
                countryId: town.region.countryId,
                regionId: town.regionId,
                townId: town.id
            });
            res.status(200).json(appointment_place);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateAppointmentPlace(req, res) {
        try {
            const town = await Town.findOne({
                where: {town_name: req.body.town_name},
                attributes: {exclude: ['town_name']},
                include: {
                    model: Region,
                    attributes: ['countryId']
                }
            });
            await Appointment_place.update({
                appointment_place_name: req.body.appointment_place_name,
                address: req.body.address,
                countryId: town.region.countryId,
                regionId: town.regionId,
                townId: town.id},
            {where: {id: req.params.id}}
            );
            res.status(200).json({
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
            await Appointment_place.destroy({
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
            const appointment_places = await Appointment_place.scope('appointmentPlace').findAll();
            res.status(200).json(appointment_places);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneAppointmentPlaceById(req, res) {
        try {
            const appointment_place = await Appointment_place.scope('appointmentPlace')
                .findOne({where: {id: req.params.id}});
            res.status(200).json(appointment_place);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new Appointment_place_controller()
