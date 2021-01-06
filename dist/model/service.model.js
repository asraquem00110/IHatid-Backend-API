"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
    service: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, default: null },
    baseprice: { type: Number, default: 0 },
    basemeter: { type: Number, default: 0 },
    pricepermeter: { type: Number, default: 0 },
}, {
    timestamps: true
});
const service = mongoose_1.model('service', ServiceSchema);
exports.default = service;
