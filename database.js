const pgp = require('pg-promise')() 

const user = 'ulka'
const password = '12345678'
const database = 'ptoject_4'

const host = process.env.PG_HOST || 'localhost'
const pgPort = process.env.PG_PORT || 5432


//postgres setup
const connection = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${host}:${pgPort}/${database}`

const db = pgp(connection)

module.exports = db