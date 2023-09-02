const jwt = require('jsonwebtoken')

module.exports = function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access denied.No Token provided.")
    
    try{
        const decode = jwt.verify(token,process.env.secret);
        console.log(decode)
        req.user = decode;
        next();
    }
    catch(err){
        res.status(400).send("Invalid token.")
    }
}