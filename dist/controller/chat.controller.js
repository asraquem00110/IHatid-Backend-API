"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = exports.chatController = void 0;
const record_model_1 = require("../model/record.model");
class ChatController {
    async sendMessage(req, res, next) {
        const { message, bookid, userid } = req.body;
        let response = await record_model_1.record.findOneAndUpdate({
            _id: bookid
        }, {
            $push: {
                conversation: {
                    userID: userid,
                    message: message,
                    createdAt: new Date(),
                }
            }
        }, { new: true }).populate('conversation.userID', "fullname email contactno picture").select('conversation');
        res.json(response);
    }
    async getMessage(req, res, next) {
        const { bookID } = req.params;
        let response = await record_model_1.record.findOne({
            _id: bookID,
        }).populate('conversation.userID', "fullname email contactno picture").select('conversation');
        res.json(response);
    }
}
exports.ChatController = ChatController;
let chatController = new ChatController();
exports.chatController = chatController;
