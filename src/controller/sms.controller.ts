import {SMSManager} from '../data/smsManager'
import {twilioSMS} from '../data/sms/twilio'

class SMSController {
    
    public sendSMS(to: string, msg: string){
        let sms = new SMSManager(new twilioSMS())
        return sms.sendSMS(to,msg)
    }
}

let smsController: SMSController = new SMSController()
export {smsController,SMSController}