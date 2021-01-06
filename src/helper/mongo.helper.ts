import mongoose from 'mongoose'
import {user as userModel} from '../model/user.model'


type MongoOptions = {
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean
}

export class MongoDBHelper {
    private static mongoOptions: MongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    public static mongooseConnect(url: string): void{
        mongoose.connect(url,this.mongoOptions)
        mongoose.connection.on("open",async ()=>{
          console.log(`Connected to mongoose Database`)
          let admin = await userModel.findOne({
              email: 'raquem.alvin@gmail.com'
          })
          if(!admin) userModel.create({
            email: 'raquem.alvin@gmail.com',
            fullname: 'Alvin Sison Raquem',
            password: '123123123',
            usertype: 0,
          })
        })  
  
        mongoose.connection.on("error",(err: any)=>{
          console.log(`Error in connecting to database ${url} : ${err}`)
        })
      }
}