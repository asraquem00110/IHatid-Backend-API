import express from 'express'
import passport from '../helper/passport'
import {PassportAuthenticate , checkisAuthenticated ,getuserinfo} from '../helper/middleware'
const apiRoutes: express.Router = express.Router()


import {authController} from '../controller/auth.controller'
import {userController} from '../controller/user.controller'
import {oauthController} from '../controller/oauth.controller'
import {clientController} from '../controller/client.controller'
import {riderController} from '../controller/rider.controller'
import {chatController} from '../controller/chat.controller'

apiRoutes.post('/auth/login', authController.login)
apiRoutes.post('/auth/refreshtoken', authController.refreshtoken)
apiRoutes.post('/auth/logout', authController.logout)



apiRoutes.get('/test', PassportAuthenticate(passport), userController.read)
apiRoutes.get('/user/info/:idno',userController.get)

apiRoutes.get('/user/list/:type/:page/:row', PassportAuthenticate(passport), checkisAuthenticated, getuserinfo, userController.list)




apiRoutes.post('/mobile/mobilelogin',authController.mobilelogin)
apiRoutes.post('/mobile/auth/initializeInfo', PassportAuthenticate(passport), checkisAuthenticated , authController.initializeInfo)
apiRoutes.post('/mobile/requestNewPin',authController.requestNewPin)
apiRoutes.post('/mobile/verifyPin',authController.verifyPin)
apiRoutes.post('/mobile/checkifFBExist',oauthController.checkIFFBExist)
apiRoutes.post('/mobile/oauth/addVerificationPincode', oauthController.addVerificationPincode)
apiRoutes.post('/mobile/oauth/facebookOauth',oauthController.facebookOauth)
apiRoutes.post('/mobile/passenger/checkIftheresPending', PassportAuthenticate(passport), checkisAuthenticated , clientController.checkIFtheresPending)
apiRoutes.post('/mobile/passenger/createBooking', PassportAuthenticate(passport),checkisAuthenticated, clientController.book)
apiRoutes.patch('/mobile/passenger/cancelBooking/:bookID', PassportAuthenticate(passport), checkisAuthenticated , clientController.cancelBooking)
apiRoutes.patch('/mobile/passenger/becomeARider', PassportAuthenticate(passport),checkisAuthenticated, clientController.becomeARider)
apiRoutes.post('/mobile/passenger/findDriver', PassportAuthenticate(passport), checkisAuthenticated, clientController.findDriver)


apiRoutes.patch('/mobile/rider/acceptBooking', PassportAuthenticate(passport), checkisAuthenticated , riderController.acceptBooking)
apiRoutes.get('/mobile/rider/getLastLocation/:id', PassportAuthenticate(passport),checkisAuthenticated , riderController.getLastLocation)
apiRoutes.post('/mobile/rider/checkIftheresPending', PassportAuthenticate(passport), checkisAuthenticated , riderController.checkIFtheresPending)


apiRoutes.post('/mobile/chat/sendMessage', PassportAuthenticate(passport), checkisAuthenticated , chatController.sendMessage)
apiRoutes.get('/mobile/chat/getMessage/:bookID', PassportAuthenticate(passport), checkisAuthenticated , chatController.getMessage)

export default apiRoutes