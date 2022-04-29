/// https://github.com/anudeepmv/WEBSTER/issues/1
/// https://github.com/anudeepmv/WEBSTER/issues/43
/// Adding program by contract for login page
const User = require('../user')
const jwt = require('jsonwebtoken')
const sessionManager = require('../../controller/login/sessionManager')
/// /**
*
* @author anudeepmv
* @invariant ("email != null && email.length() > 0")
* This class has a method that has an ability to login
*
*///
@Invariant("email != null && email.length() > 0")
class Login {
    async authenticate (data,req){
        return new Promise((resolve,reject)=>{
            User.getUser(data.email,data).then((response)=>{

                let user = response;
               /// @Requires("password != null && password.length() > 0")
                    if(response && user.role){
                        delete response.password;
                        let session=response;
                        const token = jwt.sign(session, 'activity', { 'expiresIn': 1800});
                        session.token=token;
                        sessionManager.set(session._id,session);
                  ///@Ensures("result == true and successfully login")
                        resolve({success:true,token:token,message:"Successfully login."});
                    }else if(response.status && user.role && (user.role=='User')){
                        resolve({success:false,message:"Only admin allowed to login."});
                    }
              ///  * @return
               ///      * @catches IOException
               /// if any error in login sends message as invalid user or password
            }).catch(err=>{logger.error(err);reject({success:false,message:"Invalid User or Password."});})
        });
    }
}

module.exports=new Login();

