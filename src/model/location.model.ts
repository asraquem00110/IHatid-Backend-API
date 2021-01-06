import {Schema, model, Types} from 'mongoose'


const LocationSchema = new Schema({
    driverID: {type: Schema.Types.ObjectId , ref: 'user', required: true , unique: true},
    location: {
        type: {type: String, default: "Point"},
        coordinates: {type: [Number] , default: []}
    },
    socketID: {type: String , default: null},
    available: {type: Boolean, default: true}
},{
    timestamps: true
})

LocationSchema.index({location: '2dsphere'})


const location = model('location', LocationSchema)
export {location}
