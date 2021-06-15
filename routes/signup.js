const express = require('express')
const router = express.Router()
const db = require('../database')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    res.render('pages/signup')
     message: req.body.message
})

router.post('/', (req, res) => {
    console.log(req.body)
    //validate the fields

    //check whether password and confirmPassword are the same
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("/signup?message=Passwords%20don't%20match.")
    }
    // check if email already exists in database
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email])
    .then((existingUser) => {
        if (existingUser) {
            res.redirect("/signup?message=Passwords%20don't%20match.")
        } else {
            const newUser = {
                name: req.body.name
            }
            newUser.password = bcrypt.hashSync(myPlainText, saltRounds)
            newUser.email = req.body.email.toLowerCase()

            
            db.none('INSERT INTO users(email, name, password) VALUES ($1, $2, $3);',
            [newUser.email, newUser.name, newUser.password])
            .then(() => {
                res.redirect('/login')
            })
            .catch((err) => {
                const message = err.message.replaceAll(' ', '%20')
                res.redirect(`/signup?message=${message}`)
            })
        }
    })
    .catch((err) => {
        return res.send(err.message)
    })
})

module.exports = router
