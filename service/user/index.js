///As a WEBSTER Developer, I want literature programming to be done, so that the documentation explains WHY each function or method exists #18https://github.com/anudeepmv/WEBSTER/issues/18
///As a member i want to create an Account so that i can login to view the events or activities #1(user story)https://github.com/anudeepmv/WEBSTER/issues/1
///https://github.com/anudeepmv/WEBSTER/issues/16
///The implementation of the javascript services https://www.webosose.org/docs/tutorials/js-services/developing-external-js-services/

const user=require('../../models/user')
const md5 =require('crypto-js/md5');

class User{


    /// This function is used Get Specific User
    async getUser(id,by){

        return new Promise((resolve,reject)=>{
        let query={email:id.toLowerCase()};
        if(by){
           query.password= md5(by.password).toString()
        }
       
        user.findOne(query).exec((err, user) => {
          if (!err) {
              resolve(user.toJSON());
          }
          else {
            reject({message:"Invalid email or password"});
          }
      });
       
    })
  }

    ///this function is used for the Add User
    async addUser(data){
    return new Promise(async(resolve,reject)=>{
        if (await user.findOne({ email: data.email })) {
          reject({message:`Email ${data.email} is already taken`});
          return;
      }

        data.password=md5(data.password).toString();
        
        let userData = new user(data);
        userData.save((err, savedUser) => {
            if (err) {
                reject('Error while saving user');
            }
            else {
                savedUser = savedUser.toJSON();
                resolve({
                    message: 'User Successfully Saved',
                    email: savedUser.email
                });
            }
        });
      

    });
}
///This function is used for the update of the user
async update(id,data){
    return new Promise(async(resolve,reject)=>{
        user.findByIdAndUpdate(id, data, function(err, u){
            if(err){
                reject('Error while deleting user');
            }else{
                resolve({
                    message: 'User updated Successfully'
                });
            }

        })
    });
}
///This function is used if we forget the password and wanted to reset
async forgetPassword(id,data){
    return new Promise(async(resolve,reject)=>{
        user.findOneAndUpdate({email:id,phone:new RegExp('^'+data.phone+'$', "i")}, {password:data.password}, function(err, u){
            if(err){
                reject('Error while updating password');
            }else{
                resolve({
                    message: 'User password updated Successfully'
                });
            }

        })
    });
}
///This function is used to delete the user id
async delete(id){
    return new Promise(async(resolve,reject)=>{
        user.findByIdAndDelete(id, function(err, u){
            if(err){
                reject('Error while deleting user');
            }else{
                resolve({
                    message: 'User deleted Successfully'
                });
            }

        })
    });
}


}
module.exports=new User();
