'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Contact Schema
 */
var ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'Phone is required']
    },
    created: {
        type: Date,
        default: Date.now
    },
    imgSrc: {
        type: String,
        default: '',
    }
})


const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact