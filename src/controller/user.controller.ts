import {user} from '../data/user'
import express from 'express'
import validator from '../helper/validator'


class UserController {
    
    public create(){
    //    let res = user.create()
    //    return res
    }

    public async read(req: express.Request, res: express.Response, next: express.NextFunction){
       let data =  await user.read()    
       res.json(data)
    }

    public async list(req: express.Request, res: express.Response, next: express.NextFunction){
        let {type,page, row} = req.params
        console.log(req.params)
        let data = await user.list(+type,+page,+row)
        res.json(data)
    }

    public update(){
        return new Promise((res,rej)=>{
            
        })
    }

    public delete(){
        return new Promise((res,rej)=>{
            
        })
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction){
        let info = await user.get(req.params.idno)
        res.json(info)
    }
}

const userController: UserController = new UserController()
export {userController, UserController}