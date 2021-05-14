const express = require('express');
const router = express.Router();
const {
    Users
} = require('../models')
const bcrypt = require('bcrypt');
const {
    sign
} = require('jsonwebtoken');
const {
    validateToken
} = require('../middleware/AuthMiddelware');


router.post("/", async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        tel,
        emailP,
        locatie,
        password
    } = req.body;

    bcrypt.hash(password, 10).then(hash => {
        Users.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            tel: tel,
            locatie: locatie,
            emailP: emailP,
            password: hash
        })
        res.json({
            ok: true,
            msg: "Te-ai înregistrat cu succes!"
        })
    })
});

router.post('/update', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        tel,
        emailP,
        locatie,
        id
    } = req.body;

    user = await Users.findOne({
        where: {
            id: id
        }
    })

    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.tel = tel;
    user.emailP = emailP;
    user.locatie = locatie;
    user.save();
    
    const accessToken = sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        tel: user.tel,
        emailP: user.emailP,
        email: user.email,
        locatie: user.locatie,
        password: user.password,
    }, process.env.SECRET);

    res.json({
        ok: true,
        user: user,
        accessToken: accessToken
    })
});

router.post("/updatePassword", async (req, res) => {
    const {
        oldPassword,
        newPassword,
        id,
    } = req.body;

    let user = await Users.findOne({
        where: {
            id: id
        }
    })

    bcrypt.compare(oldPassword, user.password).then(e => {
        if (e) {
            bcrypt.hash(newPassword, 10).then(r => {
                user.password = r;
                user.save();
                const accessToken = sign({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    tel: user.tel,
                    emailP: user.emailP,
                    email: user.email,
                    locatie: user.locatie,
                    password: user.password,
                }, process.env.SECRET);

                res.json({
                    ok: true,
                    accessToken: accessToken
                });
            })
        } else {
            res.json({
                ok: false,
                msg: "Parola veche nu e corectă!"
            });
        }
    })


});

router.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    console.log(req.body)
    const user = await Users.findOne({
        where: {
            email: email
        }
    });


    if (user) {
        bcrypt.compare(password, user.password).then(e => {
            if (e) {
                const accessToken = sign({
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    tel: user.tel,
                    emailP: user.emailP,
                    email: user.email,
                    locatie: user.locatie,
                    password: user.password,
                }, process.env.SECRET);

                res.json({
                    ok: true,
                    accessToken: accessToken
                });
            } else {
                res.json({
                    ok: false,
                    msg: "Parolă greșită!"
                });
            }
        })
    } else {
        res.json({
            ok: false,
            msg: "Userul nu există!"
        });
    }
})

router.get('/islogged', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router;