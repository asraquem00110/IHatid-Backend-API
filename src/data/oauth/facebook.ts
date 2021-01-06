import {IOauth} from '../interfaces/IOauth.interface'
import {user ,UserModelInterface} from '../../model/user.model'
import { verification } from '../verification'
import { userInfo } from 'os'


class FacebookOauth implements IOauth {
    
    public signup(data: any): Promise<any>{
        return new Promise(async (res,rej)=>{
           let response = await verification.verifyPinCode(`+63${data.mobileno}`,data.pin)
           let userinfo: any
           if(response){
              userinfo = await user.findOne({contactno: `+63${data.mobileno}`})
              if(userinfo){
                  userinfo.oauth.facebook.id = data.fbdetails.id
                  userinfo.oauth.facebook.accesstoken = data.fbdetails.accesstoken
                  userinfo.fullname = data.fbdetails.name
                  userinfo.address = data.fbdetails.address
                  userinfo.picture = data.fbdetails.picture
                  userinfo.status = 1
                  userinfo.email = data.fbdetails.email
              }else{
                  userinfo = new user({
                      'oauth.facebook.id': data.fbdetails.id,
                      'oauth.facebook.accesstoken': data.fbdetails.accesstoken,
                      'fullname': data.fbdetails.name,
                      'address': data.fbdetails.address,
                      'picture': data.fbdetails.picture,
                      'status': 1,
                      'usertype': 1,
                      'password': data.pin,
                      'contactno': `+63${data.mobileno}`,
                      'email': data.fbdetails.email,
                  })
              }
              userinfo.save()
           }

            res({verified: response, userinfo: userinfo})
        })
    }

    public checkifexist(fbid: string): Promise<any> {
        return new Promise(async (res,rej)=>{
            try{
                let info = await user.findOne({'oauth.facebook.id': fbid})
                res(info)
            }catch(err){
                rej(err)
            }
        })
    }
}

export default FacebookOauth