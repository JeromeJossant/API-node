const mongoose = require('mongoose');


const lessonSchema = new mongoose.Schema({

    label: {
        type: String,
        require: [true, 'Entrez un nom de cours'],
        trim: true
    },

    startDate: {
        type: Date,
        require: [true, 'Entrez une date de début'],
        trim: true
    },
    endDate: {
        type: Date,
        require: [true, 'Entrez une date de fin'],
        trim: true
    },
    classe: {type: mongoose.Schema.Types.ObjectId, ref: 'Classe'}

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at"
    }
});



module.exports = mongoose.model('lesson', lessonSchema);
