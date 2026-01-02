const mongoose = require('mongoose')

//  Define Schema for a 'User' Document
const ticketSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    product:{
        type: String,
        require: [true, 'Please select a product'],
        enum: ['iPhone', 'Macbook Pro', 'HP Elitebook', 'HP Probook'],
    },
    description:{
        type: String,
        require: [true, 'Please discribe the issue']
    },
    status:{
        type: String,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
},
{
    timestamps: true
}

)

// Create a model based on schema
const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket