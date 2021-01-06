import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'
const saltRounds = 10

interface UserModelInterface {
    email?: string,
    fullname: string,
    contactno?: string,
    oauth?: {
        facebook?:{
            accesstoken?: string,
            accessexpirationTime?: number,
            refreshtoken?: string,
            refreshexpirationTime?: number,
            updatedAt?: Date,
            id?: string,
        },
        google?:{
            accesstoken?: string,
            accessexpirationTime?: number,
            refreshtoken?: string,
            refreshexpirationTime?: number,
            updatedAt?: Date,
            id?: string,
        }
    },
    password?: string,
    pushnotiftoken?: number,
    usertype: number,
    locations?: [{
        latitude: number,
        longitude: number,
        place: string,
    }],
    status?: number,
    lastpincode?: string,
    picture?: string,
    motorcyle?: {
        name: string,
        description: string,
        plateNo: string,
        registrationNo: string,
    }
}

const UserSchema = new Schema({
    email: {required: false, type: String, unique: false , default: null},
    fullname: {required: false, type:String ,default: ''},
    address: {type: String, default: null},
    contactno: {type:String, default: null},
    oauth: {
        facebook: {
            accesstoken: {type: String, default: null},
            accessexpirationTime: {type: Number, default: null},
            refreshtoken: {type: String, default: null},
            refreshexpirationTime: {type: Number, default: null}, 
            updatedAt: {type: Date, default: new Date()},
            id: {type: String, default: null}
        },
        google: {
            accesstoken: {type: String, default: null},
            accessexpirationTime: {type: Number, default: null},
            refreshtoken: {type: String, default: null},
            refreshexpirationTime: {type: Number, default: null}, 
            updatedAt: {type: Date, default: new Date()},
            id: {type: String, default: null}
        },
    },
    password: {type: String, default: null},
    pushnotiftoken: {type: String, default: null},
    usertype: {type:Number, default: 2},
    locations: [{latitude: {type: Number, default: 0},longitude: {type: Number, default: 0}, place: {type: String, default: null}}],
    status: {type: Number ,default: 0},
    lastpincode: {type: String, default: '0000'},
    picture: {type: String, default: null},
    motorcyle: {
        motorcycle: {type: String , default: null},
        description: {type: String , default: null},
        plateno: {type: String , default: null},
        registrationNo: {type: String , default: null},
    }
},{
    timestamps: true
})

// middleware
UserSchema.pre('save',function(next){
    let userinfo: any = this
    userinfo.password = bcrypt.hashSync(userinfo.password, saltRounds)
   // userinfo.lastpicode = bcrypt.hashSync(userinfo.lastpicode, saltRounds)
    // console.log("Before saving event",userinfo)
    next()
})


const user = model("user",UserSchema)
export {user,UserModelInterface}