const express=require('express');
const routes= express.Router();
const activity=require('../controller/activity');
const auth=require('../controller/login/auth')

routes.route('/activity').get(auth,activity.get);
routes.route('/activity').post(auth,activity.add);
routes.route('/activity/:id').put(auth,activity.update);
routes.route('/activity/user/:id').get(auth,activity.byUser);
routes.route('/activity/:id').get(auth,activity.byId);
routes.route('/activity/:id').delete(auth,activity._delete);

module.exports=routes;