const express = require('express')
const router = express.Router()
const {signIn, signUp, getUserProfile, updateUserProfile} = require('../handlers/auth')
const {loginRequired, admin} = require('../middleware/auth')

//api/users 
router.route('/').post(signUp).get(loginRequired, admin)
router.post('/login', signIn)

router.route('/profile').get(loginRequired, getUserProfile)
                        .put(loginRequired, updateUserProfile)

module.exports = router