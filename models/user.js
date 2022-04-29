/// https://github.com/anudeepmv/WEBSTER/issues/43
/// https://github.com/anudeepmv/WEBSTER/issues/1
/// using pre condition for program by contract
/**
*
* @author anudeepmv
* @invariant ("email != null && email.length() > 0")
* This class has a method that has an ability to login
*
*/

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    
   
   //  * @author anudeepmv
     // * @invariant ("password != null && password.length() > 0")
    
    //* This class has a method that has an ability to login
   // *
    
   // @Invariant("first_name!= null && first_name.length() > 0") && first_name.type = string)
    
    password: { type: String, required: true, },
    phone: { type: String },
    first_name: { type: String },
    // @Invariant("last_name!= null && first_name.length() > 0") && last_name.type = string)
    last_name: { type: String },
    created_date: { type: Date },
    role: { type: String , enum : ['member','admin'],default: 'member' },
    org_id: { type: mongoose.Schema.Types.ObjectId, ref:"organization" },
    status: { type: Number , enum : [0,1,2], default: 1 } 
});

               ///      * @throws IOException
               /// if any error in login sends message as invalid user or password
UserSchema.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  }
module.exports = mongoose.model('user', UserSchema);
