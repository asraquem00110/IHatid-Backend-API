import express from 'express'
import {Oauth} from '../data/oauth'
import FacebookOauth from '../data/oauth/facebook'
import MobileFacebookOauth from '../data/oauth/mobilefacebook'
import { generatePin } from '../helper/helper'
import { verification } from '../data/verification'
import { smsController } from './sms.controller'
import jwt from 'jsonwebtoken'
import {jwtconfig} from '../helper/config'

class OauthController {

    public facebookOauth(req: express.Request, res: express.Response, next: express.NextFunction){
        let oauth = new Oauth(new FacebookOauth())
        oauth.signup(req.body).then((response: any)=>{
            if(response.verified){
                const payload: {id: string} = {id: response.userinfo._id}
                let token = jwt.sign(payload, `${jwtconfig.secret}`)
                let refreshtoken = jwt.sign(payload,`${jwtconfig.refreshsecret}`)
                // const token: string = jwt.sign(payload, `${jwtconfig.secret}` , {expiresIn: '10s'})
                // const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`,{expiresIn: '20s'})
                res.json({verified: response.verified , info: response.userinfo , accesstoken: token, refreshtoken: refreshtoken})
            }else{
                res.json(false)
            }
           
        }).catch(err=>console.log(err))
    }

    public mobilefacebookOauth(req: express.Request, res: express.Response, next: express.NextFunction){
        let oauth = new Oauth(new MobileFacebookOauth())
        return oauth.signup(req.body)
    }

    public async checkIFFBExist(req: express.Request, res: express.Response, next: express.NextFunction){
        const {fbdetails} = req.body
        let oauth = new Oauth(new FacebookOauth())
        let info = await oauth.checkifexist(fbdetails.id)
        if(info){
            const payload: {id: string} = {id: info._id}
            let token = jwt.sign(payload, `${jwtconfig.secret}`)
            let refreshtoken = jwt.sign(payload,`${jwtconfig.refreshsecret}`)
            // const token: string = jwt.sign(payload, `${jwtconfig.secret}` , {expiresIn: '10s'})
            // const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`,{expiresIn: '20s'})
            res.json({info: info , accesstoken: token, refreshtoken: refreshtoken})
        }else{
            res.json(null)
        }
    }

    public addVerificationPincode(req: express.Request, res: express.Response, next: express.NextFunction){
        const {mobilenumber} = req.body
        let pincode: string = generatePin(4)
        let savePinVerification = verification.create(`+63${mobilenumber}`,pincode)
        if(savePinVerification) smsController.sendSMS(`+63${mobilenumber}`,`Code is ${pincode}`)
        res.json({msg: savePinVerification})
    }
}
const oauthController: OauthController = new OauthController()
export {oauthController}