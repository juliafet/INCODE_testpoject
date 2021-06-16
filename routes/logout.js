const express = require('express')
const router = express.Router()
const{ redirectToLogin } = require('../middleware')

router.get('/', redirectToLogin, (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err)
            res.sendFile(err.message)
        } else {
            res.clearCookie('mrcoffee_sid')
            res.redirect('/login')
        }
    })
})

module.expotrs = router