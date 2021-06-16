const express = require('express')
const router = express.Router()
const db = require('../database')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
    res.render('pages/signup', {
        message: req.query.message
    })
})

router.post('/', (req, res) => {
    console.log(req.body)
    //validate the fields
    // Name: alphabet, accented characters, apostophe, dashes, spaces
    // Email: 
    // Password: min 8 characters and max32. alphabets and numeric. alteast one uppercase, one lower case, one numeric, one special character
    //for password: ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,32}$

    //check whether password and confirmPassword are the same
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("/signup?message=Passwords%20don't%20match.")
    }
    // check whether email already exists in the database
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email])
    .then((existingUser) => {
        if (existingUser) {
            res.redirect("/signup?message=Passwords%20don't%20match.")
        } else {
            const newUser = {
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }
            
            db.none('INSERT INTO users(email, name, password) VALUES ($1, $2, $3);',
            [newUser.email, newUser.name, newUser.password])
            .then(() => {
                res.redirect('/signup?success=true')
            })
            .catch((err) => {
                const message = err.message.replace(/ /g, '%20')
                res.redirect(`/signup?message=${message}`)
            })
        }
    })
    .catch((err) => {
        res.send(err.message)
    })
})

router.get("/success", (req, res) => {
    res.render('/signup/signup-success')
})

module.exports = router
