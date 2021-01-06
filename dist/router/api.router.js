"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../helper/passport"));
const middleware_1 = require("../helper/middleware");
const apiRoutes = express_1.default.Router();
const auth_controller_1 = require("../controller/auth.controller");
const user_controller_1 = require("../controller/user.controller");
const oauth_controller_1 = require("../controller/oauth.controller");
const client_controller_1 = require("../controller/client.controller");
const rider_controller_1 = require("../controller/rider.controller");
const chat_controller_1 = require("../controller/chat.controller");
apiRoutes.post('/auth/login', auth_controller_1.authController.login);
apiRoutes.post('/auth/refreshtoken', auth_controller_1.authController.refreshtoken);
apiRoutes.post('/auth/logout', auth_controller_1.authController.logout);
apiRoutes.get('/test', middleware_1.PassportAuthenticate(passport_1.default), user_controller_1.userController.read);
apiRoutes.get('/user/info/:idno', user_controller_1.userController.get);
apiRoutes.get('/user/list/:type/:page/:row', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, middleware_1.getuserinfo, user_controller_1.userController.list);
apiRoutes.post('/mobile/mobilelogin', auth_controller_1.authController.mobilelogin);
apiRoutes.post('/mobile/auth/initializeInfo', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, auth_controller_1.authController.initializeInfo);
apiRoutes.post('/mobile/requestNewPin', auth_controller_1.authController.requestNewPin);
apiRoutes.post('/mobile/verifyPin', auth_controller_1.authController.verifyPin);
apiRoutes.post('/mobile/checkifFBExist', oauth_controller_1.oauthController.checkIFFBExist);
apiRoutes.post('/mobile/oauth/addVerificationPincode', oauth_controller_1.oauthController.addVerificationPincode);
apiRoutes.post('/mobile/oauth/facebookOauth', oauth_controller_1.oauthController.facebookOauth);
apiRoutes.post('/mobile/passenger/checkIftheresPending', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, client_controller_1.clientController.checkIFtheresPending);
apiRoutes.post('/mobile/passenger/createBooking', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, client_controller_1.clientController.book);
apiRoutes.patch('/mobile/passenger/cancelBooking/:bookID', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, client_controller_1.clientController.cancelBooking);
apiRoutes.patch('/mobile/passenger/becomeARider', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, client_controller_1.clientController.becomeARider);
apiRoutes.post('/mobile/passenger/findDriver', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, client_controller_1.clientController.findDriver);
apiRoutes.patch('/mobile/rider/acceptBooking', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, rider_controller_1.riderController.acceptBooking);
apiRoutes.get('/mobile/rider/getLastLocation/:id', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, rider_controller_1.riderController.getLastLocation);
apiRoutes.post('/mobile/rider/checkIftheresPending', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, rider_controller_1.riderController.checkIFtheresPending);
apiRoutes.post('/mobile/chat/sendMessage', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, chat_controller_1.chatController.sendMessage);
apiRoutes.get('/mobile/chat/getMessage/:bookID', middleware_1.PassportAuthenticate(passport_1.default), middleware_1.checkisAuthenticated, chat_controller_1.chatController.getMessage);
exports.default = apiRoutes;
