import express from 'express'

export const PassportAuthenticate = (passport: any)=>{
    return passport.authenticate('jwt', { session: false })
}

export const getuserinfo = async (req: express.Request,res: express.Response,next: express.NextFunction)=>{
    const user = await req.user
    console.log(user)
    return next()
    return user
}

export const checkisAuthenticated = async (req: express.Request,res: express.Response,next: express.NextFunction)=>{
    let check = await req.isAuthenticated()
    if(check){
        return next()
    }else{
        res.json({msg: 'Unauthorized'})
    }
   
}

export const checknotAuthenticated = async (req: express.Request,res: express.Response,next: express.NextFunction)=>{
    let check = await req.isAuthenticated()
    if(check){
        res.end()
        res.redirect('/')   
    }
    
     return next()       
}