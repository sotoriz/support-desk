const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models//noteModel')
const Ticket = require('../models/ticketModel')

// @desc   Get  Notes for a ticket
// @route  Get  /api/tickets/:ticketId/notes
// @access private
const getNotes = asyncHandler (async (req, res)=>{

    // Get user using id in  jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Fetch ticket
    const ticket = await Ticket.findById(req.params.ticketId)

    console.log("Ticket:", ticket);
    console.log("Ticket ID received:", req.params.ticketId);


// Check ownership
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('User not authorized')
    }
    
 // Fetch notes for this ticket
    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})

// @desc   Create ticket Note
// @route  Get  /api/tickets/:ticketId/notes
// @access private

const addNote = asyncHandler (async (req, res)=>{

    // Get user using id in  jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Fetch ticket
    const ticket = await Ticket.findById(req.params.ticketId)

// Check ownership
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('User not authorized')
    }
    
    const note = await Note.create({
        user: req.user.id,
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote,
}