
const express=require('express');
const routes= express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir:'./public/images'});

const {getPort, getFileName} = require('../utils/common')
routes.route('/ckeditor-gallery-upload').post(multipartMiddleware,function(req,res){
    let file = req.files;
    let keys = Object.keys(file);
    let data=keys.map((key)=>{
        return {url:`//${process.env.HOST || 'localhost'}:${getPort()}/images/${getFileName(file[key].path)}`}
    });
    data = (data.length>1)?data:data[0];
    res.status(200).send({success:true,data:data});
});


module.exports=routes;