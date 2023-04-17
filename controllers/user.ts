//////////////////////////////////////////////////////////////////////////////////////////
import {Request,Response }  from 'express'
import moment from 'moment'
import UserProcedure from '../procedures/user'
import ProfileProcedure from '../procedures/profile'
//////////////////////////////////////////////////////////////////////////////////////////
const CreateController = async (req:Request,res:Response) : Promise < Response > => {

    /*OwnerId Es UserId Del usuario Logeado*/
    const OwnerId : string = res.locals.session.UserId
    /*Destructurin los campos del body  */
    const { name,email,phone,login,password } = req.body
 
    /*Buscar El ProfileId de Administrador */
    let result : any = await ProfileProcedure.FindName( { name:'Subcuenta' } )
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
                    OwnerId
                }
                
                result = await UserProcedure.Create( user )
                return res.status( result.status ).json( result.response )
        }
        else  return res.status( 400 ).json( {message:"Error De Tipos"} )
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
const ReadController = async (req:Request,res:Response) : Promise < Response > => {

    /*UserId de parametros  */
    const UserId : string = req.params.UserId
    const result = await UserProcedure.Read( {UserId} )
    return res.status( result.status ).json( result.response )
}
//////////////////////////////////////////////////////////////////////////////////////////
const UpdateController = async (req:Request,res:Response) : Promise < Response > => {

    /*UserId de parametros*/
    const UserId : string = req.params.UserId

    /*Destructurin los campos del body  */
    const { name,email,phone } = req.body
 
    /*Editar Datos Del Usuario Usuario */
    const user = { UserId,name,email,phone }
    const result = await UserProcedure.Update( user )
    return res.status( result.status ).json( result.response )

}
//////////////////////////////////////////////////////////////////////////////////////////
const DeleteController = async (req:Request,res:Response) : Promise < Response > => {

    /*Borrar Usuario */
    const { UserId } = req.params
    const result = await UserProcedure.Delete( {UserId} )
    return res.status( result.status ).json( result.response )
}
//////////////////////////////////////////////////////////////////////////////////////////
const ReportController  = async (req:Request,res:Response) : Promise < Response > => {
    /*OwnerId Es UserId Manager de las subcuentas*/
    const OwnerId : string = res.locals.session.UserId
    const filter = Object.assign({OwnerId}, req.query ) /* Agregamos otros filtros apartir del usuario dueño/creador */
    const result = await UserProcedure.FindAll( filter )
    return res.status( result.status ).json( result.response )
}
//////////////////////////////////////////////////////////////////////////////////////////
const ChangePasswordController = async (req:Request,res:Response) : Promise < Response > =>  {

    const { login,password,newpassword } = req.body

    /*Si Existe El Usuario */
    let result = await UserProcedure.FindLogin( { login }  )
    if(result.status !== 200) return res.status( result.status ).json(result.response)

    /*Verificarmos que la respuesta sea de tipo User */
    if( typeof result.response === "object" && "UserId" in result.response )
    {
        /*Comparar Password */
        const user = result.response
        const equalPassword = await UserProcedure.ComparePassword(password,user.password)
        if(!equalPassword) return res.status( 400 ).json( {message:'Password No Coincide.'} )

        /*Hash NewPassword  */
        const hashedpassword : string  =  await UserProcedure.HashPassword( newpassword )

        /*Actualizar User */
        const newuser = {
            UserId : String( user.UserId ),
            login : String(login),
            password : hashedpassword
        }

        result = await UserProcedure.Update( newuser )
        return res.status( result.status ).json( result.response )

    }
    else return res.status( 400 ).json( {message:"Error De Tipo No Esperado"} ) 
}
//////////////////////////////////////////////////////////////////////////////////////////
export { CreateController,ReadController,UpdateController,DeleteController,ReportController,ChangePasswordController }
//////////////////////////////////////////////////////////////////////////////////////////