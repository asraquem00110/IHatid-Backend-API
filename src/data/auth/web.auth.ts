import {IAuth} from '../interfaces/IAuth.interface'
import {user} from '../../model/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {jwtconfig} from '../../helper/config'

class WebAuth implements IAuth {

    public login(data: any){
        return new Promise(async (res,rej): Promise<any> =>{
            const {email , password} = data
            const userinfo: any = await user.findOne({email: email}).select('-oauth')
            if(!userinfo) rej({status: 500, msg: "No User Found"})
            let passwordcheck = await bcrypt.compareSync(password,userinfo.password)
            if(passwordcheck){
                const payload: {id: string} = {id: userinfo._id}
                const token: string = jwt.sign(payload, `${jwtconfig.secret}`)
                const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`)
                // const token: string = jwt.sign(payload, `${jwtconfig.secret}` , {expiresIn: '10s'})
                // const refreshtoken: string = jwt.sign(payload,`${jwtconfig.refreshsecret}`,{expiresIn: '20s'})
                res({
                    accessToken: token,
                    refreshToken: refreshtoken,
                    userinfo: userinfo,
                })

            }else{
                rej({status: 500, msg: "Password is incorrect"})
            }
        })
    }

    public logout(){

    }
}

export default WebAuth