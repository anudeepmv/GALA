const activity =require('../../service/activity');
const jwt =  require('jsonwebtoken')

// Get
const get=(req,res)=>{
    activity.get(req.session.logged,req.query).then((result)=>{
        result=Object.assign(result,{success:true});
        res.status(200).send(result);
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}


const add=(req,res)=>{
    req.body.org_id=req.session.logged.org_id;
    activity.add(req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"Activity successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}
const update=(req,res)=>{
    activity.update(req.params.id, req.body).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"Activity successfully updated" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

const byUser=(req,res)=>{
    activity.byUser(req.params.id).then((result)=>{
        res.status(200).send({ success:true, data:result });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

const byId=(req,res)=>{
    activity.byId(req.params.id).then((result)=>{
        res.status(200).send({ success:true, data:result });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}
const _delete=(req,res)=>{
    activity.delete(req.params.id).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"Activity successfully added" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}



module.exports={get, byUser, byId, add, update , _delete}