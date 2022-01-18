const express = require("express")
const router = new express.Router();
const { authSchema, validate } = require('../../moduls/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Data Create 
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send(error);
        }
        let user = await authSchema.findOne({ email: req.body.email });
        if (user) {
            return res.status(202).send('That user already exisits!');
        } else {
            const securePass = await bcrypt.hash(req.body.password, 10)
            const token = jwt.sign({ email: req.body.email }, req.body.email, { expiresIn: "10h" })
            req.body.token = token
            req.body.password = securePass
            const addauth = new authSchema(req.body)
            addauth.save()
            res.status(201).send("Your account was created successfully!")
        }

    }
    catch (err) {
        console.log(err)
    }
})
// router.post("/", upload.single('profileImg'), async (req, res) => {
//     try {
//         const securePass = await bcrypt.hash(req.body.password, 10)
//         const url = req.protocol + '://' + req.get('host')
//         const token = jwt.sign({ email: req.body.email }, req.body.email, { expiresIn: "10h" })
//         req.body.token = token
//         req.body.password = securePass
//         req.body.country = { a: '' }
//         req.body.profileImg = url + '/public/' + req.file.filename
//         const addauth = new auth(req.body)
//         addauth.save()
//         res.status(201).send(req.body)
//     }
//     catch (err) {
//         console.log(err)
//     }
//     // console.log(securePass)
// })
// Data Read 

router.get("/:id", async (req, res) => {
    try {
        const _id = req.params.id
        authSchema.findOne({ _id: _id }, async (err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                res.status(201).send(user)
            }
        }
        )
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