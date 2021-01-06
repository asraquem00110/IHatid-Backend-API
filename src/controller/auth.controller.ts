import express from 'express'
import validator from '../helper/validator'
import jwt from 'jsonwebtoken'
import {user} from '../model/user.model'
import {jwtconfig} from '../helper/config'
import {auth} from '../data/auth'
import {verification} from '../data/verification'
import {user as userData} from '../data/user'
import WebAuth from '../data/auth/web.auth'
import {smsController} from './sms.controller'
import {generatePin} from '../helper/helper'


class AuthController {
    
    public login(req: express.Request, res: express.Response, next: express.NextFunction){
        const rules = {
            email: 'required|email',
            password: 'required|string'
        }

        validator(req.body , rules, {}).then(async(response)=>{
            if(!response.status){
                res.json(response.err)
            }else{
                try {
                    const {email , password} = req.body
                    let authenticate = await auth.login({email: email, password: password},new WebAuth())
                    console.log(authenticate)
                    res.json(authenticate)

                }catch({status, msg}){
                    res.status(status).json({ msg: msg })
                }
            }
        })
    }

    public mobilelogin(req: express.Request, res: express.Response, next: express.NextFunction){
        const {mobilenumber} = req.body
        auth.getUser(`+63${mobilenumber}`)
        .then(async (userinfo)=>{
            let pincode: string = generatePin(4)
            if(!userinfo){
                userData.create({
                    fullname: '',
                    password: pincode,
                    usertype: 1,
                    contactno: `+63${mobilenumber}`,
                    lastpincode: pincode
                })
            }
            let savePinVerification = verification.create(`+63${mobilenumber}`,pincode)
            if(savePinVerification) smsController.sendSMS(`+63${mobilenumber}`,`Code is ${pincode}`)
            res.json({data: userinfo , pin: pincode})
        })
        .catch(err=>res.status(err.response.status).json(err))
    }

    public async initializeInfo(req: express.Request, res: express.Response, next: express.NextFunction){
        let userinfo: any = await req.user
        const { fullname , address } = req.body
        let updateinfo = await userData.update({fullname: fullname, address: address, idno: userinfo._id})
        res.json(updateinfo)
    }

    public requestNewPin(req: express.Request, res: express.Response, next: express.NextFunction){
        const {mobilenumber} = req.body
        let pincode: string = generatePin(4)
        let savePinVerification = verification.create(`+63${mobilenumber}`,pincode)
        if(savePinVerification) smsController.sendSMS(`+63${mobilenumber}`,`Code is ${pincode}`)
        res.json({msg: savePinVerification})
    }
    
    public verifyPin(req: express.Request, res: express.Response, next: express.NextFunction){
        const {pin, mobileno} = req.body
        if(verification.verifyPinCode(`+63${mobileno}`,pin)) console.log("OK")
        verification.verifyPinCode(`+63${mobileno}`,pin)
            .then(async (response)=>{
                let token: string | null = null
                let refreshtoken: string | null = null
                let userinfo: any | null = null
                if(response){
                    userinfo = await auth.getUser(`+63${mobileno}`)
                    const payload: {id: string} = {id: userinfo._id}
                    token = jwt.sign(payload, `${jwtconfig.secret}`)
                    refreshtoken = jwt.sign(payload,`${jwtconfig.refreshsecret}`)
                    // const token: string = jwt.sign(payload, `${jwtconfig.secret}` , {expiresIn: '10s'})
                    // const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`,{expiresIn: '20s'})
                }
                res.json({pincodecheck: response , info: userinfo , accesstoken: token, refreshtoken: refreshtoken})
            })
            .catch(err=>console.log(err))

    }

    public logout(req: express.Request, res: express.Response, next: express.NextFunction){
        // do something in database when user sign out
        console.log("USER LOGOUT")
        res.json({msg: "USER LOGOUT"})
    }

    public refreshtoken(req: express.Request, res: express.Response, next: express.NextFunction){
        const { refreshtoken } = req.body
        if (refreshtoken == null) return res.status(401).json({msg: "Refresh token is required"})
        jwt.verify(refreshtoken,`${jwtconfig.refreshsecret}`,async(err: any,userData: any)=>{   
            if(err) res.sendStatus(403).json(err)
            const payload: {id: string} = {id: userData.id}
            // const token: string = jwt.sign(payload, `${jwtconfig.secret}`)
            // const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`)
            const token: string = jwt.sign(payload, `${jwtconfig.secret}` , {expiresIn: '10s'})
            const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`,{expiresIn: '20s'})
            const userinfo: any = await user.findOne({_id: payload.id}).select('-oauth')
            res.json({
                accessToken: token,
                refreshToken: refreshtoken,
                userinfo: userinfo,
            })

        })
    }
}

const authController: AuthController = new AuthController()
export {authController, AuthController}