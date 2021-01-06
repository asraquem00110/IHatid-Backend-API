import {IOauth} from '../interfaces/IOauth.interface'

class MobileFacebookOauth implements IOauth {
    
    public signup(data: object): Promise<any>{
        return new Promise((res,rej)=>{

        })
    }

    public checkifexist(id: string) {
        return new Promise((res,rej)=>{

        })
    }

    public saveInfo(data: any) {

    }
}

export default MobileFacebookOauth