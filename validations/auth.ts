//////////////////////////////////////////////////////////////////////////////////////////
import { Request,Response,NextFunction} from 'express'
import  { check } from 'express-validator'
import  Handler  from '../middleware/validations'
//////////////////////////////////////////////////////////////////////////////////////////
const RegisterValidations = [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('password').not().isEmpty(),
    check('login').not().isEmpty(),
    check('password').not().isEmpty(),
    (req:Request,resp:Response,next:NextFunction) => Handler(req,resp,next)
]
//////////////////////////////////////////////////////////////////////////////////////////
const LoginValidations = [
    check('login').not().isEmpty(),
    check('password').not().isEmpty(),
    (req:Request,resp:Response,next:NextFunction) => Handler(req,resp,next)
]
//////////////////////////////////////////////////////////////////////////////////////////
export { RegisterValidations,LoginValidations }
//////////////////////////////////////////////////////////////////////////////////////////


