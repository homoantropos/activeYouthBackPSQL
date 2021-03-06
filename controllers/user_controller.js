const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const ac = require('../middleware/ac');
const User = require('../models/User');

class User_controller {

    async registerUser(req, res) {
        if (req.user.role === 'superAdmin') {
            try {
                const salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(req.body.password, salt);
                const role = await ac.getRole(req.body.role);
                if (typeof role === 'string') {
                    const user = await User.create({
                        email: req.body.email,
                        password,
                        role
                    });
                    res.status(201).json(user);
                } else {
                    res.status(401).json({
                        message: role.message ? role.message : role
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'Ви не маєте права реєструвати учасників, зверніться до адміністратора сайту.'
            })
        }
    }

    async login(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!candidate) {
                res.status(404).json({
                    message: 'EMAIL_NOT_FOUND'
                })
            } else {
                const passwordCompare = await bcrypt.compare(req.body.password, candidate.password);
                if (passwordCompare) {
                    const token = jwt.sign({
                        email: candidate.email,
                        role: candidate.role,
                        userId: candidate.id
                    }, keys.jwt, {expiresIn: 60 * 60});
                    res.status(200).json({
                        token: `Bearer ${token}`,
                        userRole: candidate.role,
                        userEmail: candidate.email
                    });
                } else {
                    res.status(401).json({
                        message: 'INVALID_PASSWORD'
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateUser(req, res) {
        if (req.user.role === 'superAdmin') {
            try {
                const salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(req.body.password, salt);
                const role = await ac.getRole(req.body.role);
                if (typeof role === 'string') {
                    await User.update({
                            email: req.body.email,
                            password,
                            role
                        },
                        {
                            where: {
                                id: req.params.id
                            }
                        })
                    res.status(200).json({
                        message: `Дані користувача успішно оновлено`
                    });
                } else {
                    res.status(401).json({
                        message: role.message ? role.message : role
                    });
                }
            } catch (error) {
                res.status(401).json({
                    message: error.message ? error.message : error
                });
            }
        } else {
            res.status(401).json({
                message: 'Ви не маєте права реєструвати учасників, зверніться до адміністратора сайту.'
            })
        }
    }

    async getAllUsers(req, res) {
        if(req.user.role === 'superAdmin') {
            try {
                const users = await User.findAll();
                res.status(201).json(users);
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        }  else {
            res.status(401).json({
                message: 'Ви не маєте права реєструвати учасників, зверніться до адміністратора сайту.'
            })
        }
    }

    async getOneUserById(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteUser(req, res) {
        if (req.user.role === 'superAdmin') {
            try {
                await User.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.status(201).json({
                    message: `Користувача успішно видалено`
                });
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(401).json({
                message: 'Ви не маєте права реєструвати учасників, зверніться до адміністратора сайту.'
            })
        }
    }

    async getRole(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!candidate) {
                res.status(404).json({
                    message: 'EMAIL_NOT_FOUND'
                })
            } else {
                const passwordCompare = await bcrypt.compare(req.body.password, candidate.password);
                if (passwordCompare) {
                    const role = candidate.role;
                    res.status(200).json(role);
                } else {
                    res.status(401).json({
                        message: 'INVALID_PASSWORD'
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new User_controller()
