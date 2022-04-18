const college =require('../../service/organization');


// Get
const get=(req,res)=>{
    college.get().then((result)=>{
        res.status(200).send({ success:true, data:result });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

const add=(req,res)=>{
    college.add(req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"College successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}


module.exports={get, add}