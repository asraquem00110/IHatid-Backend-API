import {IUser,FilterOtions} from './interfaces/IUser.interface'
import {record as recordModel} from '../model/record.model'
import { user } from '../model/user.model'
import { location } from '../model/location.model'

interface Book {
    passengerID: string,
    origin: {
        place: string,
        latitude: number,
        longitude: number,
    },
    destination: {
        place: string,
        latitude: number,
        longitude: number,
    },
    distance: string,
    price: number
}

class Client implements IUser {
    public getHistory(): Promise<Array<Object>>{
        return new Promise(async (res,rej)=>{

        })
    }

    public getFilteredHistory(filterOptions: FilterOtions): Promise<Array<Object>>{
        return new Promise(async (res,rej)=>{

        })
    }

    public async checkIFtheresPending(id: string):  Promise<any>{
        let info = await recordModel.findOne({
            passengerID: id,
            status: {$lt: 4},
        })
        return info        
    }

    public async book(data: Book){
        let record = await recordModel.create({
            passengerID: data.passengerID,
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            price: data.price,
        })
        return record
    }

    public async becomeARider(userID: string, motorcycle: string ,description: string, plateno: string){
        let response = await user.updateOne({
            _id: userID
        }, {
            $set: {
                usertype: 2,
                motorcyle: {
                    motorcycle: motorcycle,
                    description: description,
                    plateno: plateno,
                    registrationNo: '',
                }
            }
        })

        return response
    }

    public async addRiderLocation(userID: string){
        let response = await location.create({
            driverID: userID,
            location: {
                type: "Point",
                coordinates: [0,0]
            },
        })

        return response
    }

    public async findDriver(pickup: [number,number]){
        let response = await location.aggregate([
            {
                $geoNear: {
                      near: {type: "Point", coordinates: pickup},
                      distanceField: "distance",
                      maxDistance: 8000,
                      query: {socketID: {$ne: null}, available: true},
                      spherical: true,
                      key: "location"
                 }
          },
          {$sort: {distance: 1}},{$limit: 1}
        ])

        return response
    }
}

let client: Client = new Client()
export {client,Client}