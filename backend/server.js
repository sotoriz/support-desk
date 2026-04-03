
const express = require('express')
const res = require('express/lib/response')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db.js')
// const { path } = require('express/lib/application')
const path = require('path')

const PORT = process.env.PORT || 5000  
const {errorHandler} = require('./middleware/errorMiddleware')

//  connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))

app.get('/', (req, res)=>{
    // res.send('API is running...')
    res.status(200).json({message: 'Welcome to Support Desk API'})
})

// fetch all users
// app.post('/api/users/', (req, res)=>{
//     // res.send('API is running...')
//     res.status(200).json({message: 'All Users Fetched'})
// })

// signup a new user
// app.get('/api/users/', (req, res)=>{
//     res.status(201).json({message: 'New User Created'})
// })

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoute'))
app.use('/api/tickets/:ticketId/notes', require('./routes/noteRoute'));

// Serve Frontend
if(process.env.NODE_ENV === 'production'){
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => 
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))

}else{
    app.get('/', (req, res)=>{
        res.status(200).json({message: 'Welcome to Support Desk API'})
    })
}

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
