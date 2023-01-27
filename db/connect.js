const mongoose = require('mongoose')


const connectDB = (url) =>{
return mongoose
    .set('strictQuery',true)
    .connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,    
    }) 
}

module.exports = connectDB


