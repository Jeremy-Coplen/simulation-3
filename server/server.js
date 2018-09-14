require("dotenv").config()
const express = require("express")
const session = require("express-session")
const axios = require("axios")
const massive = require("massive")

const app = express()

app.use(express.json())

    const {
        SESSION_SECRET,
        SERVER_PORT,
        CONNECTION_STRING
    } = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

masssive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
}).catch(err => console.log(err))