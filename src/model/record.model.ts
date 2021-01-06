import {Schema,model} from 'mongoose'

const RecordSchema = new Schema({
    driverID: {type: Schema.Types.ObjectId , ref: 'user' , default: null},
    passengerID: {type: Schema.Types.ObjectId , ref: 'user' , default: null},
    origin: {
        place: {type: String, default: null},
        latitude: {type: Number, default: 0},
        longitude: {type: Number, default: 0},
    },
    destination: {
        place: {type: String, default: null},
        latitude: {type: Number, default: 0},
        longitude: {type: Number, default: 0},
    },
    distance: {
        text: {type: String, default: null},
        value: {type: Number, default: 0}
    },
    price: {type: Number, default: 0},
    departureTime: {type: Date, default: null},
    arrivalTime: {type: Date, default: null},
    conversation: [{
        userID: {type: Schema.Types.ObjectId , ref: 'user'},
        message: {type: String},
        createdAt: {type: Date},
        isRead: {type: Boolean, default: false}
    }],
    ratings: {
        rate: {type: Number, default: 5},
        rated: {type: Boolean, default: false}
    },
    status: {type: Number, default: 0}
},{
    timestamps: true
})

const record = model("record",RecordSchema)
export {record}