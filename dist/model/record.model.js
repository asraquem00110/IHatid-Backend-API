"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.record = void 0;
const mongoose_1 = require("mongoose");
const RecordSchema = new mongoose_1.Schema({
    driverID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', default: null },
    passengerID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', default: null },
    origin: {
        place: { type: String, default: null },
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
    },
    destination: {
        place: { type: String, default: null },
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
    },
    distance: {
        text: { type: String, default: null },
        value: { type: Number, default: 0 }
    },
    price: { type: Number, default: 0 },
    departureTime: { type: Date, default: null },
    arrivalTime: { type: Date, default: null },
    conversation: [{
            userID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
            message: { type: String },
            createdAt: { type: Date },
            isRead: { type: Boolean, default: false }
        }],
    ratings: {
        rate: { type: Number, default: 5 },
        rated: { type: Boolean, default: false }
    },
    status: { type: Number, default: 0 }
}, {
    timestamps: true
});
const record = mongoose_1.model("record", RecordSchema);
exports.record = record;
