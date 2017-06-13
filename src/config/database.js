'use strict'

const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

try {
    mongoose.connect('mongodb://localhost/nodecontactbook');
} catch (err) {
    mongoose.createConnection('mongodb://localhost/nodecontactbook');
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
        throw e;
    });