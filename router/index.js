const express=require('express');
const routes= express.Router();


routes.use('/1.0',require('./ckeditor'))
routes.use('/1.0',require('./user'))
routes.use('/1.0',require('./login'))
routes.use('/1.0',require('./oraganization'));

module.exports=routes;