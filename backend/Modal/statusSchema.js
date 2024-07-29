const mongoose =require ("mongoose")
const statusSchema = new mongoose.Schema({
    name:{
        type:String,
        require :true,
    }
})
module.exports = mongoose.model("Status",statusSchema)