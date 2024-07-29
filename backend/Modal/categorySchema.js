const mongoose = require ("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,

    },
    status_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Status"
      },
    date: {
        type: Date,
        default: Date.now(),
      },
})
module.exports=mongoose.model("Category",categorySchema)