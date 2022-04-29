/// https://github.com/anudeepmv/WEBSTER/issues/24
/// https://github.com/anudeepmv/WEBSTER/issues/13
/// https://github.com/anudeepmv/WEBSTER/issues/7
/// This module is part of a Controller subsystem within a MVC design. MVC for JavaScripit is descibed at https://www.freecodecamp.org/news/the-model-view-controller-pattern-mvc-architecture-and-frameworks-explained/
const makeValidation = require('@withvoid/make-validation');

const  {ChatRoomModel, CHAT_ROOM_TYPES } = require('../../models/chatRoom');
const ChatMessageModel = require('../../models/chatMessage');
const UserModel = require('../../models/user');

/// https://github.com/anudeepmv/WEBSTER/issues/7
module.exports={
  initiate: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
/// pre condition of the Programming by contract
          /// for user ids the type can be array or enum
          /// for user ids the options should be unique not empty and string only
          /// [issue] https://github.com/anudeepmv/WEBSTER/issues/27
      checks: {
          userIds: { 
            type: types.array, 
            options: { unique: true, empty: false, stringOnly: true } 
          },
          type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
        }
      }));
        /// post condition of the programming by contract
        /// for validation the reponse status asserts to (400),(200),(500).
        /// the return reponse asserts (400),(200),(500)
        /// [issue] https://github.com/anudeepmv/WEBSTER/issues/27
      if (!validation.success) return res.status(400).json({ ...validation });

      const { userIds, type, room_id } = req.body;
      const { userId: chatInitiator } = req;
      const allUserIds = [...userIds, chatInitiator];
      const chatRoom = await ChatRoomModel.initiateChat(allUserIds, type, room_id, chatInitiator);
      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
    /// Post message is post condition used for the program by contract
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.session.logged._id;
      const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
      //global.io.sockets.in(roomId).emit('new message', { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
    /// This function getRecentConversation is used to get the recent converstions of the chat
  getRecentConversation: async (req, res) => {
    try {
      const currentLoggedUser = req.session.logged._id;
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
      const roomIds = rooms.map(room => room._id);
      const recentConversation = await ChatMessageModel.getRecentConversation(
        roomIds, options, currentLoggedUser
      );
      return res.status(200).json({ success: true, conversation: recentConversation });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
    /// This function getRecentConversationbyroomid is used to get conversations by the roomid search
  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }
      const users = await UserModel.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };
      const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
    /// This function used to markconversation by the method readbyroomid
  markConversationReadByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }

      const currentLoggedUser = req.session.logged._id;
      const result = await ChatMessageModel.markMessageRead(roomId, currentLoggedUser);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  },
    /// The function delete is used to delete by the methood roombyid
  deleteRoomById: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoomModel.remove({ _id: roomId });
      const messages = await ChatMessageModel.remove({ chatRoomId: roomId })
      return res.status(200).json({ 
        success: true, 
        message: "Operation performed succesfully",
        deletedRoomsCount: room.deletedCount,
        deletedMessagesCount: messages.deletedCount,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
/// This function is used to delete messages by the method byid
  deleteMessageById: async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await ChatMessageModel.remove({ _id: messageId });
      return res.status(200).json({ 
        success: true, 
        deletedMessagesCount: message.deletedCount,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
        /// end of program by contract 
    }
  }
}
