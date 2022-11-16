const express = require('express');
const student = require('../models/student');
const studentModel = require('../models/student')

let router = express.Router();

router.post('/', async (req, res) => {
    const {firstname, lastname} = req.body;

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined') {
        return res.status(500).json({
            "msg": "vous devez entrer un nom et un prénom !"
        })

    }

    try {
        let student = await studentModel.create({
            firstname,
            lastname
        });

        return res.status(200).json(student);
    } catch (error) {
        return res.status(500).json({
            "msg": "il y a eu une erreur: " + error
        });
    }

});

router.get('/:id', async (req, res) => {

    const id = parseInt(req.params.id)

    try {
        const docs = await db.collection('students').find({id}).toArray()
        res.status(200).json(docs);
    } catch (err) {
        console.log(err)
        throw err
    }
});


module.exports = router;