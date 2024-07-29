const mongoose = require("mongoose")
const {schema} = mongoose
const adminSchema = new Schema({
    name :{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:false,
    },
    email:{
        type:String,
        require:true,
    },
    passward:{
        type:String,
        require:true,
    },
})
module.exports=mongoose.model("Admin",adminSchema)