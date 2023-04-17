////////////////////////////////////////////////////////////////////////////////////////////
import { RequestHandler } from 'express'
import { ValidateToken } from '../auth/jwt'
////////////////////////////////////////////////////////////////////////////////////////////
const Authorization  : RequestHandler =  async ( req, res , next ) => {     
	
    const { headers } = req
	if( "authorization" in headers && headers.authorization !== undefined && headers.authorization.includes("Bearer "))
	{
        const [bearer,token] = headers['authorization'].split("Bearer ")
        const result = await ValidateToken( token )
        if(result.error) return res.status(500).send({error:"0001",mensaje:"Error Interno"}) 
        res.locals.session = result
        return next()
	}
	else return res.status(401).send({ mensaje: 'Authorization faltante'}) 
}
////////////////////////////////////////////////////////////////////////////
export default Authorization
////////////////////////////////////////////////////////////////////////////