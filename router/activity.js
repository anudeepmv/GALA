const express=require('express');
const routes= express.Router();
const activity=require('../controller/activity');
const auth=require('../controller/login/auth')

routes.route('/activity').get(auth,activity.get);
routes.route('/activity').post(auth,activity.add);
routes.route('/activity/:id').put(auth,activity.update);


module.exports=routes;