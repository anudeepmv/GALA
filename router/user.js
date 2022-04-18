const express=require('express');
const routes= express.Router();
const user=require('../controller/user');

routes.route('/user').post(user.add);
routes.route('/user/:id').put(user.update);
routes.route('/user/:id').delete(user._delete);
routes.route('/forget-password/:email').put(user.forgetPassword);

module.exports=routes;