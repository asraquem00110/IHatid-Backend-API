
export interface ISms {
    sendSMS: (to: string, msg: string , from?: string)=> void,
}