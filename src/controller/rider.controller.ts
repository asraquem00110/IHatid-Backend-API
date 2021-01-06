import express from 'express'
import { booking } from '../data/book'
import {rider} from '../data/rider'

class RiderController {
    
    public async acceptBooking(req: express.Request, res: express.Response, next: express.NextFunction){
        let response = await booking.acceptBooking(req.body._id)
        res.json(response)
    }

    public async getLastLocation(req: express.Request, res: express.Response, next: express.NextFunction){
        let {id} = req.params
        let response = await rider.getLastLocation(id)
        res.json(response)
    }

    public async checkIFtheresPending(req: express.Request, res: express.Response, next: express.NextFunction){
        let userinfo: any = await req.user
        let data = await rider.checkIFtheresPending(userinfo._id)
        let info = null
        if(data){
            info = await booking.getInfo(data._id)
        }
        res.json(info)
    }

}

const riderController: RiderController = new RiderController()
export {riderController, RiderController}