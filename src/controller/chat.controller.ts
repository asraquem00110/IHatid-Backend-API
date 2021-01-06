import express from 'express'
import { Schema } from 'mongoose'
import {record} from '../model/record.model'

class ChatController {

    public async sendMessage(req: express.Request, res: express.Response, next: express.NextFunction){
        const {message, bookid, userid} = req.body
        let response = await record.findOneAndUpdate({
            _id: bookid
        }, {
            $push: {
                conversation: {
                    userID: userid,
                    message: message,
                    createdAt: new Date(),
                }   
            }  
        }, {new : true}).populate('conversation.userID',"fullname email contactno picture").select('conversation')
        res.json(response)
    }

    public async getMessage(req: express.Request, res: express.Response, next: express.NextFunction){
        const { bookID } = req.params
        let response = await record.findOne({
            _id: bookID,
        }).populate('conversation.userID',"fullname email contactno picture").select('conversation')
        res.json(response)
    }
}

let chatController: ChatController = new ChatController()
export {chatController,ChatController}