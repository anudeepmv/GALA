const User = require('../user')
const jwt = require('jsonwebtoken')
const sessionManager = require('../../controller/login/sessionManager')

class Login {
    async authenticate (data,req){
        return new Promise((resolve,reject)=>{
            User.getUser(data.email,data).then((response)=>{

                let user = response;
                    if(response && user.role){
                        delete response.password;
                        let session=response;
                        const token = jwt.sign(session, 'activity', { 'expiresIn': 1800});
                        session.token=token;
                        sessionManager.set(session._id,session);
                       
                        resolve({success:true,token:token,message:"Successfully login."});
                    }else if(response.status && user.role && (user.role=='User')){
                        resolve({success:false,message:"Only admin allowed to login."});
                    }

            }).catch(err=>{logger.error(err);reject({success:false,message:"Invalid User or Password."});})
        });
    }
}

module.exports=new Login();