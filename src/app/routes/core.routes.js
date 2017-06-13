const express = require("express")
const router = express.Router()
const core = require("./../controllers/core.controller")
const authService = require("../services/auth.services")



router.route('/')
    .get(core.index)
router.route('/api')
    .get(authService.authJwt, core.index)
module.exports = router