import {IUser,FilterOtions} from './interfaces/IUser.interface'
import {user as userModel,UserModelInterface} from '../model/user.model'

class User {

    public create(user: UserModelInterface){
        return new Promise((res,rej)=>{
            try {
                const newuser =  new userModel(user)
                newuser.save()
                res(newuser)
            }catch(err){
                rej(err)
            }
        })
            
    }

    public read(){
        return new Promise((res,rej)=>{
            res([{name: 'alvin', age: 24},{name: 'albert', age: 21},{name: 'annie rose',age: 15}])
        })
    }

    public async list(type: number, page: number , row: number){
        let data = await userModel.find({usertype: type}).skip(page*row).limit(row)
        return data
    }


    public update(data: {fullname: string, address: string, idno: string}){
        return new Promise(async (res,rej)=>{
            let response = await userModel.updateOne({_id: data.idno},{
                $set: {
                    fullname: data.fullname,
                    address: data.address,
                    status: 1,
                }
            })
            res(response)
        })
    }

    public delete(){
        return new Promise((res,rej)=>{
            
        })
    }

    public get(id: String){
        return new Promise(async (res,rej)=>{
           try{ 
               let info = await userModel.findOne({_id: id})
               res(info)
           }catch(err){
               rej(err)
           }
        })
    }

    public getHistory(user: IUser, id?: string){
        let records = user.getHistory(id)
        return records
    }

    public getFilteredHistory(user: IUser,filterOptions: FilterOtions){
        let records = user.getFilteredHistory(filterOptions)
        return records
    }

}

const user: User = new User()
export {user, User}