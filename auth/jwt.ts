////////////////////////////////////////////////////////////
import pkg from 'jsonwebtoken'
////////////////////////////////////////////////////////////
const GenerateToken = ( payload = {} ) => {

    const { sign } = pkg
    const privatekey = process.env.JWTPrivateKey || "123"
    const options = { expiresIn: '12h' }
    return sign( payload ,privatekey,options)
    
}
////////////////////////////////////////////////////////////
const ValidateToken = ( token = "" ) : Promise< any > => {
    
    const { verify } = pkg
    const privatekey = process.env.JWTPrivateKey || "123"

    return new Promise( ( resolve,reject ) => {
        verify( token ,privatekey,( error, data ) => {
            error ? reject( { error } ) : resolve( data )
        })
    })
}
////////////////////////////////////////////////////////////
export { GenerateToken , ValidateToken }
////////////////////////////////////////////////////////////