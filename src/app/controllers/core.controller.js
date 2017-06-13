"use strict"

const HTTPStatus = require("http-status")
const Contact = require("./../models/contact.model")

exports.index = async(req, res) => {
    try {
        const allContacts = await Contact.find()
        return res.status(HTTPStatus.OK).json(allContacts)
    } catch (error) {
        next(error);
    }
}