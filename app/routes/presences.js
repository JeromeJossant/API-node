const express = require('express');
const presence = require('../models/presence');
const presenceModel = require('../models/presence');
const lesson = require('../models/lesson');
const { request, response, json } = require('express');
const cookieParser = require('cookie-parser');

let router = express.Router();

router.post('/', async (request, response) => {
    const {studentId, lessonId} = request.body;

   
   
        lesson.findById(lessonId, async (err, lesson) => {
            if (err) {
                return res.status(500).send(err);
              }            
            const currentDate = new Date();
            console.log(currentDate)
            if (currentDate >= lesson.startDate && currentDate <= lesson.endDate) {
    
                let presence = await presenceModel.create({
                    student : studentId,
                    lesson : lessonId
                })
                return response.status(200).json(presence)

            } else {
              console.log(err)
              response.status(500).json({
                msg: "Vous ne pouvez pas être présent, le cours est terminé ou n'a pas commencé"
              })
            }
          });
  
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let presence = await presenceModel.findById(id)
        return response.status(200).json(presence)
    }catch (error) {
        return response.status(500).json(error)
    }


})

router.get('/', async (request, response) => {
    try {
        let presenses = await presenceModel.find()
        return response.status(200).json(presenses)
    } catch (error) {
        return response.status(500).json(error)
    }
})


module.exports = router;