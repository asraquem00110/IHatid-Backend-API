import {rider} from '../data/rider'

interface IOnlineDrivers {
    _id: string,
    location: {
        type: string,
        coordinates: [number, number], // [longitude , latitude]
    },
    socketID:string,
    room?: string,
}

let onlineDrivers: Array<IOnlineDrivers> = []

export const driverJoinOnline = (id: string , socketID: string, lat: number, lng: number )=>{
    rider.updateDriversLocation(id, socketID , lat , lng)
    let index = onlineDrivers.findIndex(driver=>driver.socketID === socketID)
    if(index !== -1){
        onlineDrivers[index] = {
            _id: id,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
            socketID: socketID,

        }
    }else{
        
        onlineDrivers.push({
            _id: id,
            location: {
                type: "Point",
                coordinates: [lng, lat],
            },
            socketID: socketID,

        })
    }

}


export const driverDisconnect = (socketID: string) => {
    let index = onlineDrivers.findIndex(driver=>driver.socketID === socketID)
    if(index !== -1){
        rider.disconnectDriver(onlineDrivers[index]._id)
        onlineDrivers.splice(index,1)
    }

 
}

export const getDrivers = (): Array<IOnlineDrivers> => {
    return onlineDrivers
}