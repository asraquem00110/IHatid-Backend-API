"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = exports.disconnectBooking = exports.leaveBookingRoom = exports.joinBookingRoom = void 0;
let BookRoomsConnected = [];
exports.joinBookingRoom = (socketID, room, bookID, type) => {
    let index = BookRoomsConnected.findIndex(book => book.socketID === socketID);
    if (index !== -1) {
        BookRoomsConnected[index] = {
            socketID: socketID,
            bookID: bookID,
            type: type,
            room: room
        };
    }
    else {
        BookRoomsConnected.push({
            socketID: socketID,
            bookID: bookID,
            type: type,
            room: room
        });
    }
};
exports.leaveBookingRoom = (room) => {
    let newlist = BookRoomsConnected.filter(book => book.room !== room);
    BookRoomsConnected = newlist;
};
exports.disconnectBooking = (socketID) => {
    let index = BookRoomsConnected.findIndex(book => book.socketID === socketID);
    if (index !== -1) {
        BookRoomsConnected.splice(index, 1);
    }
};
exports.getBookings = () => {
    return BookRoomsConnected;
};
