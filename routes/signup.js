const express = require('express')
const router = express.Router()
const db = require('../database')

const bcrypt = require('bcrypt');
const saltRounds = 10;

// middleware for users that are already logged in
const loggedInMessage = (req, res, next) => {
    if (req.session.userId) {
        res.render('pages/signup', {
            message: req.query.message ? req.query.message : "You are already logged in, are you sure you want to sign up?"
        })
    } else {
        next()
    }
}

router.get('/', loggedInMessage, (req, res) => {
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
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email.toLowerCase()])
    .then((existingUser) => {
        if (existingUser) {
            // email already exists
            res.redirect("/signup?message=User%20already%20exists.")
        } else {
            // put data into database
            const newUser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }
            
            db.none('INSERT INTO users(email, firstname, lastname, password) VALUES ($1, $2, $3, $4);',
            [newUser.email, newUser.firstname, newUser.lastname, newUser.password])
            .then(() => {
                console.log(newUser)
                res.redirect('/signup?success?message=Signup%20was%20successful.')
            })
            .catch((err) => {
                // error if user hasn't been inserted into the db
                const message = err.message.replace(/ /g, '%20')
                res.redirect(`/signup?message=${message}`)
            })
        }
    })
    .catch((err) => {
        // failed to check whether user email exists or not
        res.send(err.message)
    })
})

router.get("/success", (req, res) => {
    res.render('/pages/signup-success', {
        message: req.query.message
    })
})

module.exports = router
