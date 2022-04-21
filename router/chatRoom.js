const express=require('express');
const routes= express.Router();
const chatroom = require('../controller/chatRoom');
const auth=require('../controller/login/auth')

routes.route('/room').post(auth,chatroom.getRecentConversation);
routes.route('/room/:roomId').get(auth,chatroom.getConversationByRoomId);
routes.route('/room/initiate').post(auth,chatroom.initiate);
routes.route('/room/:roomId/message').post(auth,chatroom.postMessage);
routes.route('/room/:roomId/mark-read').put(auth,chatroom.markConversationReadByRoomId);

// Delete Routes
routes.route('/room/:roomId').delete(auth, chatroom.deleteRoomById)
routes.route('/message/:messageId').delete(auth, chatroom.deleteMessageById)

module.exports=routes;