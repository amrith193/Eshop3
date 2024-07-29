const mongoose = require ("mongoose")
const feedbackSchema = new mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
      },
      desprition:{
        type:String,
        require:true,
      },
      date:{
        type:Date,
        default:Date.now()
      }
})
module.exports=mongoose.model("Feedback",feedbackSchema)