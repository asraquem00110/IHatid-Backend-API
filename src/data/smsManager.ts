import {ISms} from '../data/interfaces/ISms.interface'

class SMSManager {
    private SmsProvider: ISms
    constructor(sms: ISms){
        this.SmsProvider = sms
    }

    public sendSMS(to: string, msg: string){
        this.SmsProvider.sendSMS(to,msg)
    }

}

SMSManager
export {SMSManager}