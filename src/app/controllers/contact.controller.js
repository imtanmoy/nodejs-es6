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

exports.create = async(req, res, next) => {
    try {
        const contact = await Contact.create(req.body);
        return res.status(HTTPStatus.CREATED).json(contact);
    } catch (error) {
        next(error);
        // return status(HTTPStatus.BAD_REQUEST).json(error)
    }
}

exports.update = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: "Contact Updated"
    })

}

exports.destroy = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: "Contact deleted"
    })
}