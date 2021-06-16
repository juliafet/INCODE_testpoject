const express = require('express')
const router = express.Router()
const db = require('../database')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const{ redirectToHome } = require('../middleware')

router.get('/', redirectToHome, (req, res) => {
    res.render('pages/login', {
        message: req.query.massage
    })
})

router.post('/', redirectToHome, (req, res) => {
    // has  the user enteres both email and password?
    if (req.body.email === '' || req.body.password === '') {
        return req.reirect('/login?message=Please%20insert%20both%email%20')
    }
    // does user exist?
    db.oneOrNone('SELECT & FROM users WHERE email = $1', 
    [req.body.email.toLowerCase()])
    .then((existingUser) => {
        // if not. return error
        if (!existingUser) {
            return res.redirect('/login?message=Incorrect%20login%20details.')
        }// if yes does password match user password?
        const email = existingUser.email
        const hash = existingUser.password
        const userId = existingUser.userId

        bcrypt.compare(req.body.password, hash, function(err, result) {
            if (result) {
                req.session.userId = existingUser.userId
                res.send(req.session)
            } else {
                console.log()
                res.redirect('/login?message=Incorrect%20login%20details.')
            }
        })
    })
    

    // if successful, create session and redirect

    res.redirect('/login')
})

module.exports = router
