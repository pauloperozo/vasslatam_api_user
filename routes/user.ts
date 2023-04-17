//////////////////////////////////////////////////////////////////////////////////////////
import { Router }  from 'express'
import { CreateValidations,UpdateValidations } from '../validations/user'
import { CreateController,UpdateController,ReadController,DeleteController } from '../controllers/user'
import Authorization  from '../middleware/authorization'

//////////////////////////////////////////////////////////////////////////////////////////
const router = Router()

/*Crud  Create,Read,Update,Delete */
router.post('/',Authorization,CreateValidations,CreateController)
router.get('/:UserId',Authorization,ReadController)
router.put('/:UserId',Authorization,UpdateValidations,UpdateController)
router.delete('/:UserId',Authorization,DeleteController)

/*Otras Funciones */



//////////////////////////////////////////////////////////////////////////////////////////
export default router
//////////////////////////////////////////////////////////////////////////////////////////