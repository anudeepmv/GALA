const Login =require('../../service/login')
const jwt = require('jsonwebtoken')

const authenticate= async(req,res)=>{
    Login.authenticate(req.body,req).then((data)=>{
        if(data.status && data.token){
            let sess = req.session;
            sess.token = data.token;
        }
        res.status(200).send(data);
    }).catch(err=>{
        console.log(err)
        res.status(401).send({status:false,error:err});
    });
}

const logout=async(req,res)=>{
    if(req.session){
        req.session.destroy();
    }
    res.status(200).send({status:true,message:"Successfully logout."});
}

module.exports={authenticate,logout}