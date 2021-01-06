"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.booking = void 0;
const record_model_1 = require("../model/record.model");
const mongoose_1 = require("mongoose");
class Booking {
    async getInfo(recordID) {
        let info = await record_model_1.record.findOne({ _id: recordID })
            .populate("passengerID", "fullname email contactno picture")
            .populate("driverID", "fullname email contactno motorcyle picture")
            .populate("conversation.userID", "fullname email contactno picture");
        return info;
    }
    async getInfoUsingMongodbAggregate(recordID) {
        let aggregateInfo = await record_model_1.record.aggregate([
            {
                $match: { _id: mongoose_1.Types.ObjectId(recordID) }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { id: '$passengerID' },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ['$$id', '$_id'] } }
                        },
                        {
                            $project: { "fullname": 1, "email": 1, "contactno": 1 }
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
                $unwind: { path: '$conversation', preserveNullAndEmptyArrays: true }
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
                    origin: { $first: '$origin' },
                    destination: { $first: '$destination' },
                    distance: { $first: '$distance' },
                    convo: {
                        $push: {
                            info: '$convoUserinfo',
                            message: '$conversation.message',
                        }
                    }
                }
            }
        ]);
        return aggregateInfo;
    }
    async cancelBooking(id) {
        let deleteBooking = await record_model_1.record.deleteOne({ _id: id });
        return deleteBooking;
    }
    async assignDriver(bookID, driverID) {
        let result = await record_model_1.record.updateOne({
            _id: bookID
        }, {
            $set: {
                driverID: driverID,
            }
        });
        return result;
    }
    async acceptBooking(bookID) {
        let result = await record_model_1.record.updateOne({ _id: bookID }, { $set: { status: 1 } });
        return result;
    }
}
exports.Booking = Booking;
const booking = new Booking();
exports.booking = booking;
