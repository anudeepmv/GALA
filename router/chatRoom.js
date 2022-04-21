const express=require('express');
const routes= express.Router();
const chatroom = require('../controller/chatRoom');
const auth=require('../controller/login/auth')

routes.route('/room').post(auth,chatroom.getRecentConversation);
routes.route('/room/initiate').post(auth,chatroom.initiate);
routes.route('/room/:roomId/message').post(auth,chatroom.postMessage);


// Delete Routes


module.exports=routes;