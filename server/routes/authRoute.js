const express = require('express')
const router = express.Router()
const {signIn, signUp} = require('../handlers/auth')
const {loginRequired, correctUser } = require('../middleware/auth')

router.route('/').post(signUp)
router.post('/login', signIn)

module.exports = router