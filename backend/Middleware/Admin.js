const jwt = require ('jsonwebtoken')
const JWT_SECRET = "amrith"
const fetchSeller = (req,res,next)=>{
    const token = req.header("Token")
    if (!token){
        res.status(401).send({error:'Access denied no token provides'})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        console.log("user id:",data);
        req.seller= data
        next()
    } catch (error) {
        res.status(403).send({message:'invalid token'})
    }
}
module.exports =fetchSeller


