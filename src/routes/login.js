const express = require("express")
const router = new express.Router();
const auth = require('../moduls/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Data Create 

router.post("/", async (req, res) => {
    try {
        const email = req.body.email
        auth.find({ email: email })
            .exec()
            .then(async (user) => {
                if (user.length < 1) {
                    res.status(404).send({
                        massage: "User Not Found"
                    })
                }
                else {
                    await bcrypt.compare(req.body.password, user[0].password)
                    jwt.verify(user[0].token, user[0].email, function (err, decoded) {
                        res.status(201).send({
                            massage: "User Found",
                            user: user
                        })
                    });


                }
            })
            .catch(e => {
                res.status(404).send({
                    massage: "User Not Found"
                })
            })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Data Read 

router.get("/", async (req, res) => {
    try {
        const recivedData = await auth.find();
        res.status(202).send(recivedData)
    }
    catch (e) {
        res.status(204).send(e)
    }
})

// Data Update 

router.patch("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateauth = await auth.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(202).send(updateauth)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

// Data Delete 

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updateauth = await auth.findByIdAndDelete(_id)
        res.status(202).send(updateauth)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router