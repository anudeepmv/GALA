const user =require('../../service/user');

// Get info of single user
const get=(req,res)=>{
    res.status(200).send(user.getOne(req.params.id))
}


const add=(req,res)=>{
    user.addUser(req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

const update=(req,res)=>{
    user.update(req.params.id,req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"User successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

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