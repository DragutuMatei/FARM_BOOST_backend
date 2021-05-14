const express = require('express');

const router = express.Router();

// cloud = require("cloudinary");
const {
    cloud
} = require("../utils/cloudinary");


// cloud.config({
//     cloud_name: "idksdf",
//     api_key: "613195736542618",
//     api_secret: "p_sDoSTPtMBDBHviiHQkeNIFuU8",
// });

router.post('/sendEmail', async (req, res) => {
    let extrasDeCont = req.body.extrasDeCont;
    let fisc = req.body.fisc;
    let buletin = req.body.buletin;
    let proprietate = req.body.proprietate;
    let arendare = req.body.arendare;

    try {

        await cloud.uploader
            .upload(extrasDeCont, {
                folder: "dev_setups",
            })
            .then((ress) => {
                extrasDeCont = ress.secure_url;
            });

    } catch (error) {
        console.log(error)
    }


    try {


        await cloud.uploader
            .upload(fisc, {
                folder: "dev_setups",
            })
            .then((ress) => {
                fisc = ress.secure_url;
            });

    } catch (error) {
        console.log(error)
    }


    try {

        await cloud.uploader
            .upload(buletin, {
                folder: "dev_setups",
            })
            .then((ress) => {
                buletin = ress.secure_url;
            });

    } catch (error) {
        console.log(error)
    }


    try {
        await cloud.uploader
            .upload(proprietate, {
                folder: "dev_setups",
            })
            .then((ress) => {
                proprietate = ress.secure_url;
            });

    } catch (error) {
        console.log(error)
    }

    var a = [];
    for (let i = 0; i < arendare.length; i++) {
        var b = "";

        try {
            await cloud.uploader
                .upload(arendare[i], {
                    folder: "dev_setups",
                })
                .then((ress) => {
                    b = ress.secure_url;
                    a.push(b);
                });

        } catch (error) {
            console.log(error)
        }
    }

    res.json({
        ok: true,
        extrasDeCont: extrasDeCont,
        fisc: fisc,
        buletin: buletin,
        proprietate: proprietate,
        a
    })

});

module.exports = router;