"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const driver_1 = require("./driver");
const book_1 = require("./book");
const chat_1 = require("./chat");
const LocationNamespace = app_1.io.of("/locations");
LocationNamespace.on('connection', (socket) => {
    socket.on('disconnect', () => {
        driver_1.driverDisconnect(socket.id);
        let drivers = driver_1.getDrivers();
        LocationNamespace.to('NearbyDrivers').emit('NearbyDrivers', drivers);
    });
    socket.on('joinLocationRoom', (room) => {
        socket.join(room);
    });
    socket.on('driverjoinOnline', ({ driverID, lat, lng }) => {
        driver_1.driverJoinOnline(driverID, socket.id, lat, lng);
        let drivers = driver_1.getDrivers();
        console.log(drivers);
        LocationNamespace.to('NearbyDrivers').emit('NearbyDrivers', drivers);
    });
    socket.on('assignBooking', (data) => {
        LocationNamespace.to(data.socketID).emit("requestingForAccept", data.booking);
    });
});
const BookNamespace = app_1.io.of("/booking");
BookNamespace.on('connection', (socket) => {
    socket.on('disconnect', () => {
        book_1.disconnectBooking(socket.id);
    });
    socket.on('joinBookingRoom', (data) => {
        socket.join(data.room);
        book_1.joinBookingRoom(socket.id, data.room, data.bookID, data.type);
        let bookings = book_1.getBookings();
    });
    socket.on('leaveBookingRoom', (room) => {
        socket.leave(room);
        book_1.leaveBookingRoom(room);
    });
    socket.on('displayDriver', (data) => {
        BookNamespace.to(data.room).emit('displayDriverInfo', { driverLocation: data.driverLocation, bookinfo: data.bookinfo });
    });
    socket.on('sendDriverLocation', (data) => {
        BookNamespace.to(data.room).emit('sendDriverLocation', { location: data.location, destination: data.destination });
    });
});
const ChatNamespace = app_1.io.of('/chat');
ChatNamespace.on('connection', (socket) => {
    socket.on('disconnect', () => {
        chat_1.disconnectChat(socket.id);
        console.log(chat_1.getChat());
    });
    socket.on('JoinChatRoom', (room) => {
        socket.join(room);
        chat_1.JoinChatRoom(socket.id, room);
        console.log("I AM JOINING CHAT ROOM");
        console.log(chat_1.getChat());
    });
    socket.on('sendMessage', (data) => {
        ChatNamespace.to(data.room).emit("sendMessage", data.msg);
    });
});
