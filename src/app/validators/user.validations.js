"use strict";
const Joi = require("joi");

const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
exports.create = {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(11).required(),
        password: Joi.string().regex(passwordReg).required()
    }
};