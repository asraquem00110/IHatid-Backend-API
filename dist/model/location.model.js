"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = void 0;
const mongoose_1 = require("mongoose");
const LocationSchema = new mongoose_1.Schema({
    driverID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], default: [] }
    },
    socketID: { type: String, default: null },
    available: { type: Boolean, default: true }
}, {
    timestamps: true
});
LocationSchema.index({ location: '2dsphere' });
const location = mongoose_1.model('location', LocationSchema);
exports.location = location;
