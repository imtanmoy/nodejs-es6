const express = require("express")
const router = express.Router()
const validate = require('express-validation')
const contact = require('./../controllers/contact.controller')
const contactValidation = require('./../validators/contact.validations')


router.route('/api/contact')
    .get(contact.index)
    .post(validate(contactValidation.createContact), contact.create)
    .put(contact.update)
    .delete(contact.destroy)


module.exports = router