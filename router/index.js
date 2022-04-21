const express=require('express');
const routes= express.Router();


routes.use('/1.0',require('./chatRoom'))
routes.use('/1.0',require('./ckeditor'))
routes.use('/1.0',require('./user'))
routes.use('/1.0',require('./login'))
routes.use('/1.0',require('./oraganization'));
routes.use('/1.0',require('./activity'));
routes.use('/1.0',require('./participate'));
module.exports=routes;