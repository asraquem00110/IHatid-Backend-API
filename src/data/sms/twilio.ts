import {ISms} from '../interfaces/ISms.interface'
import {twilioconfig} from '../../helper/config'
import twilio from 'twilio'

export class twilioSMS implements ISms {
    private sid: string | undefined
    private token: string | undefined
    private twilio_number: string | undefined
    private client: any

    constructor(){
        this.sid = twilioconfig.sid
        this.token = twilioconfig.token
        this.twilio_number = twilioconfig.mynumber
        this.client = twilio(this.sid,this.token)
    }

    public sendSMS(to: string, msg: string){
        this.client.messages
            .create({
                body: msg,
                from: this.twilio_number,
                to: to
            })
            .then((message: any) => console.log(message.sid));
    }
}