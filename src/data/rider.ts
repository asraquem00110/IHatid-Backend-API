import {IUser,FilterOtions} from './interfaces/IUser.interface'
import {location} from '../model/location.model'
import {record} from '../model/record.model'

class Rider implements IUser {
    public getHistory(): Promise<Array<Object>>{
        return new Promise(async (res,rej)=>{

        })
    }

    public getFilteredHistory(filterOptions: FilterOtions): Promise<Array<Object>>{
        return new Promise(async (res,rej)=>{

        })
    }

    public async getLastLocation(id: string){
        let locations = await location.findOne({
            driverID: id
        })

        return locations
    }

    public async checkIFtheresPending(id: string):  Promise<any>{
        let info = await record.findOne({
            driverID: id,
            status: {$lt: 4},
        })
        return info        
    }


    public async updateDriversLocation(driverID: string ,socketID: string,  lat: number, lng: number){
        let response = await location.updateOne({
            driverID: driverID
        }, {
            $set: {
                location: {
                    type: "Point",
                    coordinates: [lng,lat]
                },
                socketID: socketID,
            }
        })

        return response
    }

    public async disconnectDriver(driverID: string){
        let response = await location.updateOne({
            driverID: driverID
        }, {
            $set: {
                socketID: null,
            }
        })

        return response
    }
}

let rider: Rider = new Rider()
export {rider, Rider}