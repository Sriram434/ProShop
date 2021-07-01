const express = require('express')
const router = express.Router()
const {signIn, signUp} = require('../handlers/auth')
const {loginRequired, correctUser } = require('../middleware/auth')

router.post('/signup', signUp)
router.post('/login', loginRequired, signIn)

module.exports = router