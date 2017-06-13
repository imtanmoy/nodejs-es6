"use strict";

const HTTPStatus = require("http-status");
const User = require("./../models/user.model");

exports.index = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: "Index Page"
    });
};

exports.signup = async(req, res, next) => {
    try {

        if (await User.findOne({ email: req.body.email })) {
            return res.status(HTTPStatus.BAD_REQUEST).json({ message: "User Already Exists" })
        } else
        if (await User.findOne({ phone: req.body.phone })) {
            return res.status(HTTPStatus.BAD_REQUEST).json({ message: "Phone Number Already Used" })
        }
        const user = new User(req.body);
        const newUser = await user.save();
        return res.status(HTTPStatus.CREATED).json(newUser);
    } catch (error) {
        next(error)
    }
};

exports.signin = (req, res, next) => {
    return res.status(200).json(req.user.createToken())
        // return next()
};

exports.signout = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: "User Signout Successfull"
    });
};