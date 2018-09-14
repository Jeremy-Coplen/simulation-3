
module.exports = {
    login: (req, res) => {
        const db = req.app.get("db")
        const { username, password } = req.body

       db.get_user([username, password])
       .then(dbRes => {
           req.session.user = dbRes[0]

           res.status(200).send(req.session.user)
       })
       .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
    },

    register: (req, res) => {
        const db = req.app.get("db")
        const { username, password } = req.body

       db.create_user([username, password])
       .then(dbRes => {
           req.session.user = dbRes[0]

           res.status(200).send(req.session.user)
       })
       .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect("http://localhost:3000/#/")
    },

    getAllPosts: (req, res) => {
        const db = req.app.get("db")
        const { search, myposts } = req.query

        if(search) {
            db.get_all_filtered_posts([search])
        .then(dbRes => {
            res.status(200).send(dbRes)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
        }
        else if(myposts) {
            db.get_all_user_posts([Number(req.params.userid)])
            .then(dbRes => {
                res.status(200).send(dbRes)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
        }
        else {
            db.get_all_posts()
            .then(dbRes => {
                res.status(200).send(dbRes)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
        }
    },

    getOnePost: (req, res) => {
        const db = req.app.get("db")
        console.log(req.params)

        db.get_one_post([Number(req.params.postid)])
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    },

    createPost: (req, res) => {
        const db = req.app.get("db")
        const { title, image, content } = req.body

        db.create_post([title, image, content, Number(req.params.userid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    }
}