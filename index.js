const express = require('express')
const app = express()
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')

//require('dotenv').config()
const morgan = require('morgan')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(expressLayouts)

//router files
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const signupRouter = require('./routes/signup')
const homeRouter = require('./routes/home')

app.use('/public', express.static('public'))

//parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// session setup
app.use(session({
    cookie: {
        maxAge: 3000, // 1 hour
        // secure: false, // must be true if served via HTTPS
    },
    name: 'mrcoffee_sid',
    secret: 'Its a secret!',
    resave: false,
    saveUninitialized: false
}))

// routes
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)
app.use('/', homeRouter)

app.use(morgan('dev'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
