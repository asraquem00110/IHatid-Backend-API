require('dotenv').config()
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import {MongoDBHelper} from './helper/mongo.helper'
import {server,db} from './helper/config'
import apiRoutes from './router/api.router'
import passport from './helper/passport'



const app = express()
const http_: http.Server = http.createServer(app)
export const io = require('socket.io')(http_);
import './socketUtilities/socket'

app.use(passport.initialize())

const corsOptions = {
    origin: '*',
    methods: ['GET','POST','OPTIONS','PUT','PATCH','DELETE'],
    allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
 }
app.use(cors(corsOptions))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

var cookieParser = require('cookie-parser')
app.use(cookieParser('keyboard cat'))
var session = require('express-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))

app.use('/api',apiRoutes)



http_.listen(server.port,async ()=>{
    console.log(`listening to port ${server.port}`)
    try {
        await MongoDBHelper.mongooseConnect(`${db.mongodbURL}`)
    } catch(err){
        console.log(err)
    }
})


