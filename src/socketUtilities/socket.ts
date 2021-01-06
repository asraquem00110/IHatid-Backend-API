// Socket IO Server

import {io} from '../app'
import { Socket } from "socket.io"
import { driverDisconnect, driverJoinOnline, getDrivers } from "./driver"
import { joinBookingRoom , getBookings , disconnectBooking , leaveBookingRoom } from './book'
import { disconnectChat, JoinChatRoom , getChat } from './chat'

const LocationNamespace = io.of("/locations")
LocationNamespace.on('connection',(socket: Socket)=>{

    //console.log(`Connected Location Namespace ${socket.id}`)
    socket.on('disconnect',()=>{
       // console.log(`Disconnected Location Namespace ${socket.id}`)
        driverDisconnect(socket.id)
        let drivers = getDrivers()
       // console.log(drivers.length)
        LocationNamespace.to('NearbyDrivers').emit('NearbyDrivers', drivers)
    })



    socket.on('joinLocationRoom',(room: string)=>{
        socket.join(room)
    })

    socket.on('driverjoinOnline' ,({driverID, lat ,lng}:{driverID: string, lat: number, lng: number})=> {
        driverJoinOnline(driverID , socket.id , lat , lng)
        let drivers = getDrivers()
        console.log(drivers)
        LocationNamespace.to('NearbyDrivers').emit('NearbyDrivers', drivers)
    })

    
    socket.on('assignBooking', (data: {socketID: string , driverID: string , booking: any })=>{
        LocationNamespace.to(data.socketID).emit("requestingForAccept", data.booking)
    })


})


const BookNamespace = io.of("/booking")
BookNamespace.on('connection',(socket: Socket)=>{


    // socket disconnected
    socket.on('disconnect',()=>{
        disconnectBooking(socket.id)
    })

    socket.on('joinBookingRoom',(data: {room: string , bookID: string , type: string})=>{
        socket.join(data.room)
        joinBookingRoom(socket.id, data.room ,data.bookID , data.type)
        let bookings = getBookings()
    })

    socket.on('leaveBookingRoom', (room)=>{
        socket.leave(room)
        leaveBookingRoom(room)
    })

    socket.on('displayDriver', (data: {room: string, driverLocation: {latitude: number, longitude: number} | null, bookinfo: any})=>{
        BookNamespace.to(data.room).emit('displayDriverInfo', {driverLocation: data.driverLocation, bookinfo: data.bookinfo})
    })

    socket.on('sendDriverLocation',(data: {location: {latitude: number, longitude: number} | null, room: string, destination: any})=>{
        BookNamespace.to(data.room).emit('sendDriverLocation',{location: data.location, destination: data.destination})
    })

})


const ChatNamespace = io.of('/chat')
ChatNamespace.on('connection',(socket: Socket)=>{

    // socket disconnected
    socket.on('disconnect',()=>{
        disconnectChat(socket.id)
        console.log(getChat())
    })

    socket.on('JoinChatRoom', (room: string)=>{
        socket.join(room)
        JoinChatRoom(socket.id, room)
        console.log("I AM JOINING CHAT ROOM")
        console.log(getChat())
    })

    socket.on('sendMessage', (data: {room: string , msg: any})=>{
        ChatNamespace.to(data.room).emit("sendMessage", data.msg)
    })

})
