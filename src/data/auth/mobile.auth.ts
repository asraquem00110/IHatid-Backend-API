import {IAuth} from '../interfaces/IAuth.interface'

class MobileAuth implements IAuth {

    public login(data: any): Promise<any>{
        return new Promise((res,rej)=>{

        })
    }

    public logout(){
        
    }
}