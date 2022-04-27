///https://github.com/anudeepmv/WEBSTER/issues/13
///https://github.com/anudeepmv/WEBSTER/issues/6
/// This module is part of a Controller subsystem within a MVC design. MVC for JavaScripit is descibed at https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/
const Login =require('../../service/login')
const jwt = require('jsonwebtoken')
///Function "authenticate is used to authenticate the user by user data provided while he logged in
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
