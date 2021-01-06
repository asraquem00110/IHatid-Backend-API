"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderController = exports.riderController = void 0;
const book_1 = require("../data/book");
const rider_1 = require("../data/rider");
class RiderController {
    async acceptBooking(req, res, next) {
        let response = await book_1.booking.acceptBooking(req.body._id);
        res.json(response);
    }
    async getLastLocation(req, res, next) {
        let { id } = req.params;
        let response = await rider_1.rider.getLastLocation(id);
        res.json(response);
    }
    async checkIFtheresPending(req, res, next) {
        let userinfo = await req.user;
        let data = await rider_1.rider.checkIFtheresPending(userinfo._id);
        let info = null;
        if (data) {
            info = await book_1.booking.getInfo(data._id);
        }
        res.json(info);
    }
}
exports.RiderController = RiderController;
const riderController = new RiderController();
exports.riderController = riderController;
