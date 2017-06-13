'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const compareSync = bcrypt.compareSync
const jwt = require('jsonwebtoken');


/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Phone is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [true, 'Password must be longer!!']
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})


UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this.hashPassword(this.password);
    }
    return next();
});


UserSchema.methods = {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign({
            _id: this._id
        }, 'secretekey')
    }
}


const User = mongoose.model('User', UserSchema)
module.exports = User