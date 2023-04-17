//////////////////////////////////////////////////////////////////////////////////////////
import moment from 'moment'
import {Request,Response }  from 'express'
import {GenerateToken} from '../auth/jwt'
import UserProcedure from '../procedures/user'
import ProfileProcedure from '../procedures/profile'
//////////////////////////////////////////////////////////////////////////////////////////
const RegisterController = async (req:Request,res:Response) : Promise < Response > => {

    const { name,email,phone,login,password } = req.body
 
    /*Buscar El ProfileId de Administrador */
    let result : any = await ProfileProcedure.FindName( { name:'Administrador' } )
    if( result.status !== 200 ) return res.status( result.status ).json( result.response )   
    else
    {
        /*Destructuramos Para Obtener response */
        const { response } = result
        if( typeof response === "object" && "ProfileId" in response )
        {
                /*Destructuramos Para Obtener el idProfile */
                const { ProfileId } = response
                
                /*Hash Password Para guardar Database */
                const hashedpassword : string  =  await UserProcedure.HashPassword( password )

                /*Crear Nuevo Usuario */
                const user = {
                    name,
                    email,
                    phone,
                    login:String(login),
                    password: hashedpassword,
                    ProfileId:String(ProfileId),
                    OwnerId:null
                }
                
                result = await UserProcedure.Create( user )
                return res.status( result.status ).json( result.response )
        }
        else  return res.status( 400 ).json( {message:"Error De Tipos"} )
    }

}
//////////////////////////////////////////////////////////////////////////////////////////
const LoginController = async (req:Request,res:Response) : Promise < Response > => {

    const { login,password } = req.body

    /*Mensaje Por Defecto */
    const message = "Login o Password Invalido"

    /*Si Existe El Usuario */
    const result = await UserProcedure.FindLogin( { login }  )
    if(result.status !== 200) return res.status( 400 ).json({message})
   
    /*Verificamos la Respuesta es de tipo User */
    if( typeof result.response === "object" && "password" in result.response )
    {
        /*Si Es La Misma Contraseña */
        const user = result.response
        const equalPassword = await UserProcedure.ComparePassword(password,user.password)
        if(!equalPassword) return res.status( 400 ).json({message})

        /*Generamos Token */
        const UserId =  String( user.UserId )
        const createAt = moment().format("YYYY-MM-DD HH:mm:ss")

        const response  = { 
                success:true, 
                UserId,
                token : GenerateToken( { UserId,createAt } ),
                createAt 
        }

        /*Respondemos */
        return res.status( 200 ).json( response )
    }
    else  return res.status( 200 ).json({message})
  
}
//////////////////////////////////////////////////////////////////////////////////////////
export {RegisterController,LoginController}
//////////////////////////////////////////////////////////////////////////////////////////