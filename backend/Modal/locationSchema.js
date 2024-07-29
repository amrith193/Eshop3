const mongoose = require ("mongoose")
 const locationSchema = new mongoose.Schema({
    place:{
        type:String,
        require:true,
    },
    date: {
        type: Date,
        default: Date.now(),
      },
 })
 module.exports =mongoose.model("Location",locationSchema)