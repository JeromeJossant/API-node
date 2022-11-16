const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();


app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://root:root@mongo:27017/b3?authSource=admin', {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('BD connect');
    }
})

const classeRouter = require('./routes/classes');
const studentRouter = require('./routes/students');


app.get("/", (req, res) => {
    res.status(200).send('<h1>hello world !!</h1>')
});
app.use('/classes', classeRouter);
app.use('/students', studentRouter);

app.listen(4500, () => {
    console.log('Server is running on http://127.0.0.1:4500');
});