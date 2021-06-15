const express = require('express')
const app = express()

//require('dotenv').config()
const ejs = require('ejs')
const morgan = require('morgan')
//const db = require('.database')
const expressLayouts = require('express-ejs-layouts')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')


app.use('/public', express.static('public'))

app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/login', loginRouter)
app.use('/signup', signupRouter)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(morgan('dev'))

const PORT = process.env.PORT || 3000




app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


