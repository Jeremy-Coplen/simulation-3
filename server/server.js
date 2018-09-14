require("dotenv").config()
const express = require("express")
const session = require("express-session")
const axios = require("axios")
const massive = require("massive")

const c = require("./controllers/controller")

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

app.post("/login", c.login)
app.post("/register", c.register)
app.get("/logout", c.logout)
app.get("/api/posts/:userid", c.getAllPosts)
app.get("/api/post/:postid", c.getOnePost)
app.post("/api/create-post/:userid", c.createPost)

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
}).catch(err => console.log(err))