import {IOauth} from '../interfaces/IOauth.interface'

class GoogleOauth implements IOauth {
    
    public signup(data: object): Promise<any>{
        return new Promise((res,rej)=>{

        })
    }

    public checkifexist(fbid: string): Promise<any> {
        return new Promise((res,rej)=>{

        })
    }
}

export default GoogleOauth