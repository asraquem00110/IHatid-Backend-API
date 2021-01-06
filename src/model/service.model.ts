import {Schema, model} from 'mongoose'

const ServiceSchema = new Schema({
    service: {type: String,required: true},
    description: {type: String,required: true},
    img: {type: String,default: null},
    baseprice: {type: Number,default: 0},
    basemeter: {type: Number,default: 0},
    pricepermeter: {type: Number,default: 0},

},{
    timestamps: true
})

const service = model('service',ServiceSchema)
export default service