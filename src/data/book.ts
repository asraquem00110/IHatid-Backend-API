import {record} from '../model/record.model'
import {Types} from 'mongoose'
import { rider } from './rider'

class Booking {

    public async getInfo(recordID: string){
        let info: any = await record.findOne({_id: recordID})
                .populate("passengerID","fullname email contactno picture")
                .populate("driverID","fullname email contactno motorcyle picture")
                .populate("conversation.userID", "fullname email contactno picture")
        return info
    }

    public async getInfoUsingMongodbAggregate(recordID: string){
        // conversation is connected to users
        let aggregateInfo = await record.aggregate([
            {
                $match: {_id: Types.ObjectId(recordID)}
            },
            {
                $lookup: {
                    from: 'users',
                    let: {id: '$passengerID'},
                    pipeline: [
                        {
                            $match: {$expr: {$eq: ['$$id', '$_id']}}
                        },
                        {
                            $project: {"fullname": 1 , "email": 1 , "contactno": 1}
                        }
                    ],
                    as: 'PassengerInfo'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'driverID',
                    foreignField: '_id',
                    as: 'DriverInfo'
                }
            },
            {
                $unwind: {path: '$conversation', preserveNullAndEmptyArrays: true}
            },
            {
                $lookup: {
                        from: 'users',
                        foreignField: "_id",
                        localField: "conversation.userID",
                        as: "convoUserinfo"
                    }
            },
            {
                   $group: {
                       _id: '$_id',
                       origin: {$first: '$origin'},
                       destination: {$first: '$destination'},
                       distance: {$first: '$distance'},
                       convo: {
                            $push: {
                                info: '$convoUserinfo',
                                message: '$conversation.message',
                            }
                       }
                   }
            }
        ])

        return aggregateInfo
    }

    
    public async cancelBooking(id: string){
        let deleteBooking = await record.deleteOne({ _id: id })
        return deleteBooking
    }

    public async assignDriver(bookID: string, driverID: string){
        let result = await record.updateOne({
            _id: bookID
        },{
            $set: {
                driverID: driverID,
            }
        })

        return result
    }

    public async acceptBooking(bookID: string){
        let result = await record.updateOne({_id: bookID},{$set:{status: 1}})
        return result
    }
}

const booking: Booking = new Booking()
export {booking,Booking}