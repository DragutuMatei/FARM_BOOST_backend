const express = require('express');
const router = express.Router();
const {
    Anunturi
} = require('../models')

router.post("/add", async (req, res) => {
    const {
        first,
        last,
        email,
        tit,
        txt
    } = req.body;
    console.log(txt)
    await Anunturi.create({
        user_f: first,
        user_l: last,
        email: email,
        tit: tit,
        txt: txt,
    })

    res.json({
        ok: true,
        msg: "Anunțul a fost postat!"
    })
});


router.get("/get", async (req, res) => {
    const anunturi = await Anunturi.findAll();
    console.log(anunturi)
    res.json({
        anunturi: anunturi
    });
})

router.post('/delete', async (req, res) => {
   
    Anunturi.destroy({where:{id:req.body.id}})


    res.json({ ok: true });
});





module.exports = router;