////////////////////////////////////////////////////////////////////////////////////////////
import { RequestHandler} from 'express'
import connection from '../database/connection'
////////////////////////////////////////////////////////////////////////////////////////////
const DbCheck : RequestHandler = async ( req, res, next): Promise<void> => {

  try {
    
    await connection()
    next()
    
  } catch (error) {

      console.error('Error de conexión a la base de datos:', error)
      res.status(500).json({ message: 'Problema al conectar con la base de datos' })
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export default DbCheck
////////////////////////////////////////////////////////////////////////////////////////////