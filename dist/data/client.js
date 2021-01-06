"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.client = void 0;
const record_model_1 = require("../model/record.model");
const user_model_1 = require("../model/user.model");
const location_model_1 = require("../model/location.model");
class Client {
    getHistory() {
        return new Promise(async (res, rej) => {
        });
    }
    getFilteredHistory(filterOptions) {
        return new Promise(async (res, rej) => {
        });
    }
    async checkIFtheresPending(id) {
        let info = await record_model_1.record.findOne({
            passengerID: id,
            status: { $lt: 4 },
        });
        return info;
    }
    async book(data) {
        let record = await record_model_1.record.create({
            passengerID: data.passengerID,
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            price: data.price,
        });
        return record;
    }
    async becomeARider(userID, motorcycle, description, plateno) {
        let response = await user_model_1.user.updateOne({
            _id: userID
        }, {
            $set: {
                usertype: 2,
                motorcyle: {
                    motorcycle: motorcycle,
                    description: description,
                    plateno: plateno,
                    registrationNo: '',
                }
            }
        });
        return response;
    }
    async addRiderLocation(userID) {
        let response = await location_model_1.location.create({
            driverID: userID,
            location: {
                type: "Point",
                coordinates: [0, 0]
            },
        });
        return response;
    }
    async findDriver(pickup) {
        let response = await location_model_1.location.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: pickup },
                    distanceField: "distance",
                    maxDistance: 8000,
                    query: { socketID: { $ne: null }, available: true },
                    spherical: true,
                    key: "location"
                }
            },
            { $sort: { distance: 1 } }, { $limit: 1 }
        ]);
        return response;
    }
}
exports.Client = Client;
let client = new Client();
exports.client = client;
