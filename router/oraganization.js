const express=require('express');
const routes= express.Router();
const college=require('../controller/organization');
const auth=require('../controller/login/auth')

routes.route('/college').post(college.add);
routes.route('/college').get(college.get);
module.exports=routes;