////////////////////////////////////////////////////////////////////////////////////////////
import { RequestHandler } from 'express'
////////////////////////////////////////////////////////////////////////////////////////////
const ErrorHttp:RequestHandler = ( req, res, next ) => {

    res.status(404).json({ message:'Recurso no encontrado' })
}
////////////////////////////////////////////////////////////////////////////////////////////
export default ErrorHttp
////////////////////////////////////////////////////////////////////////////////////////////