const express = require('express')
const router = express.Router()
const db = require('../database')
const { redirectToHome } = require('../middleware')

router.get('/', redirectToHome, (req,res) => {
    res.render('pages/home')
})

router.post()