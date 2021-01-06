import {IOauth} from './interfaces/IOauth.interface'

class Oauth {
    private oauth: IOauth;
    constructor(ioauth: IOauth){
        this.oauth=  ioauth
    }

    public signup(data: object){
        return this.oauth.signup(data)
    }

    public checkifexist(id: string){
        return this.oauth.checkifexist(id)
    }
}

export {Oauth}