const express = require ('express')
const ConnectToMongo=require ('./db')
const cors = require ('cors')
ConnectToMongo()

const app = express()
app.use(cors())
app.use(express.json())
port = 9000

app.use('/api/register',require('./Router/userRoute'))
app.use('/api/product',require('./Router/productRoute'))
app.use('/Images', express.static('Images'));
app.use('/api/category',require('./Router/categortRoute'))
app.use('/api/cart',require('./Router/cartRoute'))
app.use('/api/orders',require('./Router/orderRoute'))
app.use('/api/',require('./Router/orderRoute'))
app.use('/api/auth',require('./Middleware/authRouter'))

app.use('/uploads/user',express.static('./uploads/user'))
app.use('/uploads/product',express.static('./productImage'))

app.listen(port,()=>{
    console.log("api is listening port "+port);
})