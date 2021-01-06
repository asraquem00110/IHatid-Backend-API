import express from 'express'
import { booking } from '../data/book'
import {client, Client} from '../data/client'
import {user} from '../data/user'
import validator from '../helper/validator'
import {BookingSocketclient , LocationsSocketclient} from '../helper/socket'

class ClientController {

    public getHistory(){
        let data = user.getHistory(new Client(), 'historyID')
    }

    public getFilteredHistory(){
        let data = user.getFilteredHistory(new Client(), {dateFrom: new Date(), dateTo: new Date(), refNo: 'refNo'})
    }

    public async checkIFtheresPending(req: express.Request, res: express.Response, next: express.NextFunction){
        let userinfo: any = await req.user
        let data = await client.checkIFtheresPending(userinfo._id)
        let info = null
        if(data){
            info = await booking.getInfo(data._id)
        }
        res.json(info)
    }

    public async book(req: express.Request, res: express.Response, next: express.NextFunction){
        let userinfo: any = await req.user
        const {origin , destination , distance , price } = req.body
        let data = {
            passengerID: userinfo._id,
            origin: origin,
            destination: destination,
            distance: distance,
            price: price,
        }
        let bookings = await client.book(data)
        let detailedInfo = await booking.getInfo(bookings._id)
        // BookingSocketclient.emit('joinBookingRoom', {room: `Book_${bookings._id}`, bookID: bookings._id, type: "passenger" })
        res.json(detailedInfo)
    }

    public async cancelBooking(req: express.Request, res: express.Response, next: express.NextFunction){
        const {bookID} = req.params
        let cancel = await booking.cancelBooking(bookID)
        BookingSocketclient.emit('leaveBookingRoom', `Book_${bookID}`)
        res.json(cancel)
    }

    public becomeARider(req: express.Request, res: express.Response, next: express.NextFunction){
        const {motorcycle, description, plateno } = req.body
        const rules = {
            motorcycle: "required|string",
            description: "required|string",
            plateno: ["required","regex:/^([a-zA-Z0-9]){2,4}-([a-zA-Z0-9]){2,4}$/"]
        }

        validator(req.body , rules, {}).then(async(response)=>{
            if(!response.status){
                res.json(response.err)
            }else{
                let userinfo: any = await req.user
                let response = await client.becomeARider(userinfo._id, motorcycle, description , plateno)
                let addriderlocation =  await client.addRiderLocation(userinfo._id)
                res.json(response)
            }
        })
       
    }

    public async findDriver(req: express.Request, res: express.Response, next: express.NextFunction){
        const {bookID , pickup ,dropoff } = req.body
        let result = await client.findDriver(pickup)
        if(result.length > 0){
            let driverinfo = result[0]
            let updatedriver = await booking.assignDriver(bookID, driverinfo.driverID)
            let bookinfo = await booking.getInfo(bookID) 
            res.json({socketID:  driverinfo.socketID , driverID: driverinfo.driverID  , booking: bookinfo})
        }else{
            res.json({})
        }
        
    }
}

const clientController: ClientController = new ClientController()
export {clientController, ClientController}