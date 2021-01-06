"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBHelper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../model/user.model");
class MongoDBHelper {
    static mongooseConnect(url) {
        mongoose_1.default.connect(url, this.mongoOptions);
        mongoose_1.default.connection.on("open", async () => {
            console.log(`Connected to mongoose Database`);
            let admin = await user_model_1.user.findOne({
                email: 'raquem.alvin@gmail.com'
            });
            if (!admin)
                user_model_1.user.create({
                    email: 'raquem.alvin@gmail.com',
                    fullname: 'Alvin Sison Raquem',
                    password: '123123123',
                    usertype: 0,
                });
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.log(`Error in connecting to database ${url} : ${err}`);
        });
    }
}
exports.MongoDBHelper = MongoDBHelper;
MongoDBHelper.mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
