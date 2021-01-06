import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'
const saltRounds = 10

interface VerificationModelInterface {
    mobileno: string,
    pincode: string,
}

const VerificationSchema = new Schema({
    mobileno: {type: String, required: true},
    pincode: {type: String, required: true}
},{
    timestamps: true
})


// middleware
VerificationSchema.pre('save',function(next){
    let verificationInfo: any = this
    verificationInfo.pincode = bcrypt.hashSync(verificationInfo.pincode, saltRounds)
    console.log("Before saving event",verificationInfo)
    next()
})

const verification = model('verification', VerificationSchema)
export {verification, VerificationModelInterface}
