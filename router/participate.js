const express=require('express');
const routes= express.Router();
const participate=require('../controller/participate');
const auth=require('../controller/login/auth')

routes.route('/participate/:id/:user_id').delete(auth,participate._delete);
routes.route('/participate/:id').post(auth,participate.add);

module.exports=routes;