const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class User_controller {

    async registerUser(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);
            const person = await db.query(`INSERT INTO person (email, password, role) values ($1, $2, $3) RETURNING _id, email, role`,
                [req.body.email, password, req.body.role]);
            res.status(201).json(person.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async login(req, res) {
        try {
            const candidate = await db.query(`SELECT email, role, password, _id FROM person where email = ($1) `, [req.body.email]);
            if(candidate) {
                const passwordCompare = await bcrypt.compare(req.body.password, candidate.rows[0].password);
                if(passwordCompare) {
                    const token = jwt.sign({
                        email: candidate.rows[0].email,
                        role: candidate.rows[0].role,
                        _id: candidate.rows[0]._id
                    }, keys.jwt, {expiresIn: 60 * 60});
                    res.status(200).json({
                        token: `Bearer ${token}`
                    });
                } else {
                    res.status(401).json({
                        message: 'INVALID_PASSWORD'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'EMAIL_NOT_FOUND'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateUser(req, res) {
        try {
            const _id = req.params.id;
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);
            const person = await db.query(
                `UPDATE person set email = $1, password = $2, role = $3 where _id = $4 RETURNING email, role, _id`,
                [req.body.email, password, req.body.role, _id]
            );
            res.status(200).json({
                message: `Дані користувача успішно оновлено`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllUsers(req, res) {
        try {
            const persons = await db.query(`SELECT _id, email, role FROM person ORDER BY role`);
            res.status(201).json(persons.rows);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOneUserById(req, res) {
        try {
            const id = req.params.id;
            const person = await db.query(`SELECT _id, email, role FROM person where _id = ($1)`, [id]);
            res.status(201).json(person.rows[0]);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            await db.query(`DELETE FROM person where _id = ($1)`, [id]);
            res.status(201).json({
                message: `Користувача успішно видалено`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new User_controller()
