const mongoose = require (`mongoose`)
const mongoURL= "mongodb://localhost:27017/SellIt"
const ConnectToMongo = async ()=>{
    try {
        await mongoose.connect(mongoURL)
        console.log("connected to mongo sucessfully");
    } catch (error) {
        console.log("connected to mongo unsucessfully");
    }
}
module.exports=ConnectToMongo