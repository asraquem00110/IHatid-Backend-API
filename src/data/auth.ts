import {IAuth} from './interfaces/IAuth.interface'
import {user as userModel} from '../model/user.model'

class Auth {

    public login(data: any,auth: IAuth){
        return auth.login(data)
    }

    public logout(auth: IAuth){
        return auth.logout()
    }

    public refreshtoken(){

    }

    public async getUser(mobilenumber: string){
        let user = await userModel.findOne({contactno: mobilenumber})
        return user
    }

}

let auth: Auth = new Auth()
export {auth,Auth}