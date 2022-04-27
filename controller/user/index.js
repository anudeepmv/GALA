///https://github.com/anudeepmv/WEBSTER/issues/13
///https://github.com/anudeepmv/WEBSTER/issues/16
///This mode is part of index subsystem.javascript is described at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf/
const user =require('../../service/user');

// Get info of single user
const get=(req,res)=>{
    res.status(200).send(user.getOne(req.params.id))
}

/// The function add is to add the user
const add=(req,res)=>{
    user.addUser(req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}
/// The function update is to update the user
const update=(req,res)=>{
    user.update(req.params.id,req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}
/// The Function delete is to delete the user
const _delete=(req,res)=>{
    user.delete(req.params.id).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

const forgetPassword=(req,res)=>{
    user.forgetPassword(req.params.email, req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}


module.exports={get,add, update, _delete, forgetPassword}
