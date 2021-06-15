const expres = require('express')
//require('dotenv').config()
const ejs = require('ejs')
const morgan = require('morgan')
//const db = require('.database')
const expressLayouts = require('express-ejs-layouts')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express()

app.use('/public', express.static('public'))

app.use(expressLayouts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(morgan('dev'))

const PORT = process.env.PORT || 3000

app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.post('/login', (req, res) => {
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


