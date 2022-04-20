const participate =require('../../service/participate');
const { authorisedAdmin } = require('../../utils/common')

const add=(req,res)=>{
    let data={user_id:req.session.logged._id , activity_id:req.params.id, subscribe:req.body.participate};
    participate.add(data).then((result)=>{
        res.status(200).send({ success:true, data:result, message:"Participated successfully" });
    }).catch(err=>{res.status(500).send({ success:false, message:err });})
}

const _delete=(req,res)=>{
    if(authorisedAdmin(req,res)){
        let data={user_id:req.params.user_id,activity_id:req.params.id};
        participate.delete(data).then((result)=>{
            res.status(200).send({ success:true, data:result, message:"Participated successfully" });
        }).catch(err=>{res.status(500).send({ success:false, message:err });})
    }
}

module.exports={ add, _delete }