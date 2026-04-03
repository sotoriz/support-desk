const mongoose = require('mongoose')

//  Define Schema for a 'User' Document
const noteSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    text:{
        type: String,
        required: [true, 'Please add some text'],
    },
    isStaff:{
        type: Boolean,
        default: false
    },
    staffId:{
        type: String,
    }
},
{
    timestamps: true,
}

)

// Create a model based on schema
const Note = mongoose.model('Note', noteSchema)

module.exports = Note