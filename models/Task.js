const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
   name:{
       type:String,
       required:[true,'must provide name'],
       trim:true,
       maxlength:[20,'name cannot be more than 20 characters']
   },
   description: {
    type: String,
    required: [true,'must provide description'],
    trim: true,
    maxlength: [500, 'Describe in no more than 50 characters'],
  },
   completed:{
       type:Boolean,
       default:false
   }, 
})


module.exports = mongoose.model('Task',TaskSchema)