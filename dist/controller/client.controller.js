"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = exports.clientController = void 0;
const book_1 = require("../data/book");
const client_1 = require("../data/client");
const user_1 = require("../data/user");
const validator_1 = __importDefault(require("../helper/validator"));
const socket_1 = require("../helper/socket");
class ClientController {
    getHistory() {
        let data = user_1.user.getHistory(new client_1.Client(), 'historyID');
    }
    getFilteredHistory() {
        let data = user_1.user.getFilteredHistory(new client_1.Client(), { dateFrom: new Date(), dateTo: new Date(), refNo: 'refNo' });
    }
    async checkIFtheresPending(req, res, next) {
        let userinfo = await req.user;
        let data = await client_1.client.checkIFtheresPending(userinfo._id);
        let info = null;
        if (data) {
            info = await book_1.booking.getInfo(data._id);
        }
        res.json(info);
    }
    async book(req, res, next) {
        let userinfo = await req.user;
        const { origin, destination, distance, price } = req.body;
        let data = {
            passengerID: userinfo._id,
            origin: origin,
            destination: destination,
            distance: distance,
            price: price,
        };
        let bookings = await client_1.client.book(data);
        let detailedInfo = await book_1.booking.getInfo(bookings._id);
        res.json(detailedInfo);
    }
    async cancelBooking(req, res, next) {
        const { bookID } = req.params;
        let cancel = await book_1.booking.cancelBooking(bookID);
        socket_1.BookingSocketclient.emit('leaveBookingRoom', `Book_${bookID}`);
        res.json(cancel);
    }
    becomeARider(req, res, next) {
        const { motorcycle, description, plateno } = req.body;
        const rules = {
            motorcycle: "required|string",
            description: "required|string",
            plateno: ["required", "regex:/^([a-zA-Z0-9]){2,4}-([a-zA-Z0-9]){2,4}$/"]
        };
        validator_1.default(req.body, rules, {}).then(async (response) => {
            if (!response.status) {
                res.json(response.err);
            }
            else {
                let userinfo = await req.user;
                let response = await client_1.client.becomeARider(userinfo._id, motorcycle, description, plateno);
                let addriderlocation = await client_1.client.addRiderLocation(userinfo._id);
                res.json(response);
            }
        });
    }
    async findDriver(req, res, next) {
        const { bookID, pickup, dropoff } = req.body;
        let result = await client_1.client.findDriver(pickup);
        if (result.length > 0) {
            let driverinfo = result[0];
            let updatedriver = await book_1.booking.assignDriver(bookID, driverinfo.driverID);
            let bookinfo = await book_1.booking.getInfo(bookID);
            res.json({ socketID: driverinfo.socketID, driverID: driverinfo.driverID, booking: bookinfo });
        }
        else {
            res.json({});
        }
    }
}
exports.ClientController = ClientController;
const clientController = new ClientController();
exports.clientController = clientController;
