const expres = require('express')
const ejs = require('ejs')
const morgan = require('morgan')

const app = express()

app.use('/public', express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(morgan('dev'))

const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


