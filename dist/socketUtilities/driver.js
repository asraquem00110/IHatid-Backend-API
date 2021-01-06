"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDrivers = exports.driverDisconnect = exports.driverJoinOnline = void 0;
const rider_1 = require("../data/rider");
let onlineDrivers = [];
exports.driverJoinOnline = (id, socketID, lat, lng) => {
    rider_1.rider.updateDriversLocation(id, socketID, lat, lng);
    let index = onlineDrivers.findIndex(driver => driver.socketID === socketID);
    if (index !== -1) {
        onlineDrivers[index] = {
            _id: id,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
            socketID: socketID,
        };
    }
    else {
        onlineDrivers.push({
            _id: id,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
            socketID: socketID,
        });
    }
};
exports.driverDisconnect = (socketID) => {
    let index = onlineDrivers.findIndex(driver => driver.socketID === socketID);
    if (index !== -1) {
        rider_1.rider.disconnectDriver(onlineDrivers[index]._id);
        onlineDrivers.splice(index, 1);
    }
};
exports.getDrivers = () => {
    return onlineDrivers;
};
