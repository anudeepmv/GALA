const express=require('express');
const routes= express.Router();
const login=require('../controller/login')

routes.route('/login').post(login.authenticate)
routes.route('/logout').post(login.logout)


module.exports=routes;