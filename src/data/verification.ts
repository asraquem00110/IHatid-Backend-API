import {verification as verificationModel , VerificationModelInterface} from '../model/verification.model'
import bcrypt from 'bcrypt'

class Verification {

    public create(mobileno: string, pincode: string){
        let verifiedPin = new verificationModel({
            mobileno: mobileno,
            pincode: pincode
        })
        verifiedPin.save()
        return verifiedPin
    }

    public async verifyPinCode(mobileno: string, pincode: string): Promise<boolean> {
        let latestcode: any = await verificationModel.findOne({
            mobileno: mobileno
        }).sort({ _id: -1 })

        let pincheck = await bcrypt.compareSync(pincode,latestcode.pincode)
        return pincheck
    }



}

let verification: Verification = new Verification()
export {verification,Verification}