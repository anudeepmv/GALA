const jwt = require('jsonwebtoken');
const sessionManager = require('../../controller/login/sessionManager')

const auth=async(req,res,next)=>{

    
    try{

        let authToken=req.header('Authorization').replace('Bearer ','');
        let session=sessionManager.parseSession(authToken);
        if(sessionManager.get(session._id).token==authToken){
                jwt.verify(authToken,"activity");
                req.session.logged=session;
                next();
        }else{
            res.status(401).send({status:false,message:"Please login again."})
        }
        
    }catch(e){
       logger.error(e)
    }

};

module.exports=auth