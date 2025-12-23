

const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000                                           

const app = express()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))

app.get('/', (req, res)=>{
    // res.send('API is running...')
    res.status(200).json({message: 'Welcome to Support Desk API'})
})
// fetch all users
app.post('/api/users/', (req, res)=>{
    // res.send('API is running...')
    res.status(200).json({message: 'All Users Fetched'})
})

// signup a new user
app.get('/api/users/', (req, res)=>{
    res.status(201).json({message: 'New User Created'})
})

