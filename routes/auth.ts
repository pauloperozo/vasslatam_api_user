//////////////////////////////////////////////////////////////////////////////////////////
import { Router }  from 'express'
import { RegisterValidations,LoginValidations } from '../validations/auth'
import { RegisterController,LoginController } from '../controllers/auth'
//////////////////////////////////////////////////////////////////////////////////////////
const router = Router()
router.post('/register',RegisterValidations,RegisterController)
router.post('/login',LoginValidations,LoginController)
//////////////////////////////////////////////////////////////////////////////////////////
export default router
//////////////////////////////////////////////////////////////////////////////////////////