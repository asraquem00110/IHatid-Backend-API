"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.user = void 0;
const user_model_1 = require("../model/user.model");
class User {
    create(user) {
        return new Promise((res, rej) => {
            try {
                const newuser = new user_model_1.user(user);
                newuser.save();
                res(newuser);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    read() {
        return new Promise((res, rej) => {
            res([{ name: 'alvin', age: 24 }, { name: 'albert', age: 21 }, { name: 'annie rose', age: 15 }]);
        });
    }
    async list(type, page, row) {
        let data = await user_model_1.user.find({ usertype: type }).skip(page * row).limit(row);
        return data;
    }
    update(data) {
        return new Promise(async (res, rej) => {
            let response = await user_model_1.user.updateOne({ _id: data.idno }, {
                $set: {
                    fullname: data.fullname,
                    address: data.address,
                    status: 1,
                }
            });
            res(response);
        });
    }
    delete() {
        return new Promise((res, rej) => {
        });
    }
    get(id) {
        return new Promise(async (res, rej) => {
            try {
                let info = await user_model_1.user.findOne({ _id: id });
                res(info);
            }
            catch (err) {
                rej(err);
            }
        });
    }
    getHistory(user, id) {
        let records = user.getHistory(id);
        return records;
    }
    getFilteredHistory(user, filterOptions) {
        let records = user.getFilteredHistory(filterOptions);
        return records;
    }
}
exports.User = User;
const user = new User();
exports.user = user;
