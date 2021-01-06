"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rider = exports.rider = void 0;
const location_model_1 = require("../model/location.model");
const record_model_1 = require("../model/record.model");
class Rider {
    getHistory() {
        return new Promise(async (res, rej) => {
        });
    }
    getFilteredHistory(filterOptions) {
        return new Promise(async (res, rej) => {
        });
    }
    async getLastLocation(id) {
        let locations = await location_model_1.location.findOne({
            driverID: id
        });
        return locations;
    }
    async checkIFtheresPending(id) {
        let info = await record_model_1.record.findOne({
            driverID: id,
            status: { $lt: 4 },
        });
        return info;
    }
    async updateDriversLocation(driverID, socketID, lat, lng) {
        let response = await location_model_1.location.updateOne({
            driverID: driverID
        }, {
            $set: {
                location: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                socketID: socketID,
            }
        });
        return response;
    }
    async disconnectDriver(driverID) {
        let response = await location_model_1.location.updateOne({
            driverID: driverID
        }, {
            $set: {
                socketID: null,
            }
        });
        return response;
    }
}
exports.Rider = Rider;
let rider = new Rider();
exports.rider = rider;
