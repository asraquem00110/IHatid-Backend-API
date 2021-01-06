import Validator from 'validatorjs'
import {user as userModel} from '../model/user.model'

interface ValidatorResoonse {
    err: Validator.Errors | null,
    status: boolean,
}

const validator = (body: Validator.TypeCheckingRule, rules: Validator.Rules, customMessages: Validator.ErrorMessages): Promise<ValidatorResoonse> => {
    return new Promise((resolve,reject)=>{
        try {
            const validation = new Validator(body, rules, customMessages);
            validation.passes(() => resolve({err: null, status: true}));
            validation.fails(() => resolve({err: validation.errors, status: false}));
        }catch(err){
            reject(err)
        }
      
    })
}

// custom validation 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./
// Tighten password policy
                    // customname  ,    condition     ,        custommessage
Validator.register('strict', (value: any) => passwordRegex.test(value),'password must contain at least one uppercase letter, one lowercase letter and one number')


Validator.registerAsync('unique', async (value: any, attribute: any, req: any, passes: Function)=> {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: unique:table,column');

    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);
    const { 0: table, 1: column } = attArr;
    let msg = (column == "email") ? `${column} has already been taken `: `${column} already in use`

    let admin = await userModel.findOne({
        email: value
    })
    admin ? passes(false,msg) : passes(true)

  },"Sample Message");


export default validator