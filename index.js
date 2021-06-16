const express = require('express')
const app = express()
const session = require('express-session')

//require('dotenv').config()
const ejs = require('ejs')
const morgan = require('morgan')
//const db = require('.database')
const expressLayouts = require('express-ejs-layouts')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const homeRouter = require('.routes/home')
const logoutRouter = require('.routes/logout')

app.use('/public', express.static('public'))

app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// session
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        // secure: false, // must be true if served via HTTPS
    },
    name: 'mrcoffee_sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)
app.use('/', homeRouter)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(morgan('dev'))

const PORT = process.env.PORT || 3000




app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


