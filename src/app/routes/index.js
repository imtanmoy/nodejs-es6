'use strict'
const userApi = require('./user.routes')
const contactApi = require('./contact.routes')
const coreApi = require('./core.routes')

module.exports = (app) => {
    app.use(userApi)
    app.use(contactApi)
    app.use(coreApi)
}