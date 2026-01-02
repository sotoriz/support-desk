const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connect: ${conn.connection.host}`.cyan.underline)
    }catch (error){
        console.log(`error : ${error.message}`.red.underline.bold);
    }

}

module.exports = connectDB