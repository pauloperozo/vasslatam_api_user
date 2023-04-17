//////////////////////////////////////////////////////////////////////////////////////////
import { Request,Response,NextFunction} from 'express'
import { check } from 'express-validator'
import  Handler  from '../middleware/validations'
//////////////////////////////////////////////////////////////////////////////////////////
const CreateValidations = [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('login').not().isEmpty(),
    check('password').not().isEmpty(),
    (req:Request,resp:Response,next:NextFunction) => Handler(req,resp,next)
]
//////////////////////////////////////////////////////////////////////////////////////////
const UpdateValidations = [
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('phone').not().isEmpty(),
    (req:Request,resp:Response,next:NextFunction) => Handler(req,resp,next)
]
//////////////////////////////////////////////////////////////////////////////////////////
const ChangePassValidations = [
    check('login').not().isEmpty(),
    check('password').not().isEmpty(),
    check('newpassword').not().isEmpty(),
    (req:Request,resp:Response,next:NextFunction) => Handler(req,resp,next)
]
//////////////////////////////////////////////////////////////////////////////////////////
export { CreateValidations,UpdateValidations,ChangePassValidations }
//////////////////////////////////////////////////////////////////////////////////////////