////////////////////////////////////////////////////////////////////////////////////////////
import { RequestHandler } from 'express'
////////////////////////////////////////////////////////////////////////////////////////////
const ErrorHttp : RequestHandler =  ( req, res, next ) => {

    const ms = process.env.TIMEOUT ? Number( process.env.TIMEOUT ) : 0

    const time = setTimeout( __=> req.emit('timeout',{}), ms)	
    req.on('timeout', __ => {

          clearInterval( time )
          if(res.statusMessage == undefined)
          {
                res.status(503).json({ message:"Servidor Tiempo Agotado"})
          }
          
    }) 
    
    res.on('finish', ( ) =>  clearInterval( time ) )

    next()
}
////////////////////////////////////////////////////////////////////////////////////////////
export default ErrorHttp
////////////////////////////////////////////////////////////////////////////////////////////