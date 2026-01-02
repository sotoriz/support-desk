const mongoose = require('mongoose')

//  Define Schema for a 'User' Document
const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please add a name']
    },
    email:{
        type: String,
        require: [true, 'Please add an emai,l'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'Please add a password']
    },
    isAdmin:{
        type: Boolean,
        require: true,
        default: false
    }
},
{
    timestamps: true
}

)

// Create a model based on schema
const User = mongoose.model('User', userSchema)

module.exports = User